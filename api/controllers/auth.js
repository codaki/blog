import bcrypt from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import qrcode from "qrcode";
import speakeasy from "speakeasy";
import { db } from "../db.js";
config();

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Usuario ya existe!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const secret = speakeasy.generateSecret({ name: "Blog Grupo 8" });

    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) return res.status(500).json(err);

      const q =
        "INSERT INTO users(`username`,`email`,`password`, `2fa_secret`) VALUES (?)";
      const values = [req.body.username, req.body.email, hash, secret.base32];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({
          message: "Se creo el usuario",
          qr_code: data_url,
        });
      });
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Usuario no encontrado!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Usuario o Contraseña incorrecta!");

    const { token } = req.body;
    const isTokenValid = speakeasy.totp.verify({
      secret: data[0]["2fa_secret"],
      encoding: "base32",
      token: token,
    });

    if (!isTokenValid) return res.status(400).json("Token 2FA incorrecto!");

    const jwtToken = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    const { password, ...other } = data[0];

    res
      .cookie("access_token", jwtToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
