import jwt from "jsonwebtoken";
import { addComments, getComments } from "../controllers/coment.js";
import { db } from "../db.js";

jest.mock("jsonwebtoken");
jest.mock("../db.js");

describe("Comment Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getComments", () => {
    test("Se debe obtener un comentario de forma exitosa", async () => {
      req.params.id = "1";
      const mockComments = [
        { id: 1, username: "user1", coment: "Great post!", date: "2023-08-17" },
        { id: 2, username: "user2", coment: "Nice work!", date: "2023-08-18" },
      ];

      db.query.mockImplementation((q, values, callback) => {
        callback(null, mockComments);
      });

      await getComments(req, res);

      expect(db.query).toHaveBeenCalledWith(
        expect.stringContaining(
          "select c.id, u.username, c.coment,c.date from coment c"
        ),
        ["1"],
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockComments);
    });

    test("Status 500 error de la base de datos", async () => {
      req.params.id = "1";

      db.query.mockImplementation((q, values, callback) => {
        callback(new Error("Database error"), null);
      });

      await getComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("addComments", () => {
    test("should add comment successfully", async () => {
      req.cookies.access_token = "valid_token";
      req.body = {
        coment: "New comment",
        date: "2023-08-17",
        pid: "1",
      };

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { id: "user_id" });
      });

      db.query.mockImplementation((q, values, callback) => {
        callback(null, { insertId: 1 });
      });

      await addComments(req, res);

      expect(jwt.verify).toHaveBeenCalledWith(
        "valid_token",
        process.env.JWT_SECRET,
        expect.any(Function)
      );
      expect(db.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO coment"),
        [["New comment", "2023-08-17", "user_id", "1"]],
        expect.any(Function)
      );
      expect(res.json).toHaveBeenCalledWith("El comentario ha sido creado");
    });

    test("should return 401 if no token provided", async () => {
      req.cookies.access_token = null;

      await addComments(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("No autenticado!");
    });

    test("should return 403 if token is invalid", async () => {
      req.cookies.access_token = "invalid_token";

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error("Invalid token"), null);
      });

      await addComments(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith("Token no es valido!");
    });

    test("should handle database error when adding comment", async () => {
      req.cookies.access_token = "valid_token";
      req.body = {
        coment: "New comment",
        date: "2023-08-17",
        pid: "1",
      };

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { id: "user_id" });
      });

      db.query.mockImplementation((q, values, callback) => {
        callback(new Error("Database error"), null);
      });

      await addComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
