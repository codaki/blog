import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import qrcode from "qrcode";
import speakeasy from "speakeasy";
import { login, logout, register } from "../controllers/auth.js";
import { db } from "../db.js";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("qrcode");
jest.mock("speakeasy");
jest.mock("../db.js");

describe("Authentication Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };
  });

  describe("register", () => {
    test("Debe registrar un usuario", async () => {
      req.body = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      db.query.mockImplementation((q, values, callback) => {
        if (q.startsWith("SELECT")) {
          callback(null, []);
        } else if (q.startsWith("INSERT")) {
          callback(null, { insertId: 1 });
        }
      });

      bcrypt.genSaltSync.mockReturnValue("salt");
      bcrypt.hashSync.mockReturnValue("hashedpassword");
      speakeasy.generateSecret.mockReturnValue({
        base32: "secret",
        otpauth_url: "otpauth://...",
      });
      qrcode.toDataURL.mockImplementation((url, callback) => {
        callback(null, "data:image/png;base64,...");
      });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Se creo el usuario",
        qr_code: expect.any(String),
      });
    });

    test("Debe retornar un status 409 de que ya existe", async () => {
      req.body = {
        username: "existinguser",
        email: "existing@example.com",
        password: "password123",
      };

      db.query.mockImplementation((q, values, callback) => {
        callback(null, [{ id: 1 }]);
      });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith("Usuario ya existe!");
    });
  });

  describe("login", () => {
    test("should log in a user successfully", async () => {
      req.body = {
        username: "testuser",
        password: "password123",
        token: "123456",
      };

      db.query.mockImplementation((q, values, callback) => {
        callback(null, [
          {
            id: 1,
            username: "testuser",
            password: "hashedpassword",
            "2fa_secret": "secret",
          },
        ]);
      });

      bcrypt.compareSync.mockReturnValue(true);
      speakeasy.totp.verify.mockReturnValue(true);
      jwt.sign.mockReturnValue("jwttoken");

      await login(req, res);

      expect(res.cookie).toHaveBeenCalledWith(
        "access_token",
        "jwttoken",
        expect.any(Object)
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          username: "testuser",
        })
      );
    });

    test("Status 404 de no haber encontrado", async () => {
      req.body = {
        username: "nonexistentuser",
        password: "password123",
      };

      db.query.mockImplementation((q, values, callback) => {
        callback(null, []);
      });

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith("Usuario no encontrado!");
    });

    test("Status 400 de contraseña incorrecta", async () => {
      req.body = {
        username: "testuser",
        password: "wrongpassword",
      };

      db.query.mockImplementation((q, values, callback) => {
        callback(null, [
          {
            id: 1,
            username: "testuser",
            password: "hashedpassword",
          },
        ]);
      });

      bcrypt.compareSync.mockReturnValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("Usuario o Contraseña incorrecta!");
    });

    test("Status 400 de token incorrecto", async () => {
      req.body = {
        username: "testuser",
        password: "password123",
        token: "wrongtoken",
      };

      db.query.mockImplementation((q, values, callback) => {
        callback(null, [
          {
            id: 1,
            username: "testuser",
            password: "hashedpassword",
            "2fa_secret": "secret",
          },
        ]);
      });

      bcrypt.compareSync.mockReturnValue(true);
      speakeasy.totp.verify.mockReturnValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("Token 2FA incorrecto!");
    });
  });

  describe("logout", () => {
    test("Logout exitoso", async () => {
      await logout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith(
        "access_token",
        expect.any(Object)
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("User has been logged out.");
    });
  });
});
