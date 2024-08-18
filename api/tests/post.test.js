import jwt from "jsonwebtoken";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";
import { db } from "../db.js";

jest.mock("jsonwebtoken");
jest.mock("../db.js");

describe("Post Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      cookies: {},
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe("getPosts", () => {
    test("should get all posts when no category is provided", async () => {
      const mockPosts = [
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" },
      ];
      db.query.mockImplementation((q, values, callback) => {
        callback(null, mockPosts);
      });

      await getPosts(req, res);

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM posts",
        [undefined],
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    test("should get posts by category when category is provided", async () => {
      req.query.cat = "technology";
      const mockPosts = [{ id: 1, title: "Tech Post" }];
      db.query.mockImplementation((q, values, callback) => {
        callback(null, mockPosts);
      });

      await getPosts(req, res);

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM posts WHERE cat=?",
        ["technology"],
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    test("should handle database error", async () => {
      db.query.mockImplementation((q, values, callback) => {
        callback(new Error("Database error"), null);
      });

      await getPosts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("getPost", () => {
    test("Se debe obtener un solo post", async () => {
      req.params.id = "1";
      const mockPost = { id: 1, title: "Test Post", username: "testuser" };
      db.query.mockImplementation((q, values, callback) => {
        callback(null, [mockPost]);
      });

      await getPost(req, res);

      expect(db.query).toHaveBeenCalledWith(
        expect.stringContaining("SELECT p.id,`username`, `title`"),
        ["1"],
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    test("Status 500 error de la base de datos", async () => {
      req.params.id = "1";
      db.query.mockImplementation((q, values, callback) => {
        callback(new Error("Database error"), null);
      });

      await getPost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("addPost", () => {
    test("should add a new post", async () => {
      req.cookies.access_token = "valid_token";
      req.body = {
        title: "New Post",
        desc: "Description",
        img: "image.jpg",
        cat: "category",
        date: "2023-08-17",
      };

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { id: "user_id" });
      });

      db.query.mockImplementation((q, values, callback) => {
        callback(null, { insertId: 1 });
      });

      await addPost(req, res);

      expect(jwt.verify).toHaveBeenCalledWith(
        "valid_token",
        process.env.JWT_SECRET,
        expect.any(Function)
      );
      expect(db.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO posts"),
        [
          [
            "New Post",
            "Description",
            "image.jpg",
            "category",
            "2023-08-17",
            "user_id",
          ],
        ],
        expect.any(Function)
      );
      expect(res.json).toHaveBeenCalledWith("El post ha sido creado");
    });

    test("should return 401 if no token provided", async () => {
      req.cookies.access_token = null;

      await addPost(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("No autenticado!");
    });

    test("should return 403 if token is invalid", async () => {
      req.cookies.access_token = "invalid_token";

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error("Invalid token"), null);
      });

      await addPost(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith("Token no es valido!");
    });
  });

  describe("deletePost", () => {
    test("should delete a post", async () => {
      req.cookies.access_token = "valid_token";
      req.params.id = "1";

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { id: "user_id" });
      });

      db.query.mockImplementation((q, values, callback) => {
        callback(null, { affectedRows: 1 });
      });

      await deletePost(req, res);

      expect(jwt.verify).toHaveBeenCalledWith(
        "valid_token",
        process.env.JWT_SECRET,
        expect.any(Function)
      );
      expect(db.query).toHaveBeenCalledWith(
        "DELETE FROM posts WHERE `id`=? ",
        ["1"],
        expect.any(Function)
      );
      expect(res.json).toHaveBeenCalledWith("El Post ha sido eliminado");
    });

    test("should return 401 if no token provided", async () => {
      req.cookies.access_token = null;

      await deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("No autenticado!");
    });
  });

  describe("updatePost", () => {
    test("should update a post", async () => {
      req.cookies.access_token = "valid_token";
      req.params.id = "1";
      req.body = {
        title: "Updated Post",
        desc: "Updated Description",
        img: "updated-image.jpg",
        cat: "updated-category",
      };

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { id: "user_id" });
      });

      db.query.mockImplementation((q, values, callback) => {
        callback(null, { affectedRows: 1 });
      });

      await updatePost(req, res);

      expect(jwt.verify).toHaveBeenCalledWith(
        "valid_token",
        process.env.JWT_SECRET,
        expect.any(Function)
      );
      expect(db.query).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE posts SET"),
        [
          "Updated Post",
          "Updated Description",
          "updated-image.jpg",
          "updated-category",
          "1",
        ],
        expect.any(Function)
      );
      expect(res.json).toHaveBeenCalledWith("El post ha sido actualizado");
    });

    test("should return 401 if no token provided", async () => {
      req.cookies.access_token = null;

      await updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("No autenticado!");
    });
  });
});
