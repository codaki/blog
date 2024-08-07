import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import e from "express";
config();
export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id,`username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date`, p.post_likes, p.post_dislikes FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("No autenticado!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token no es valido!");
    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("El post ha sido creado");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("No autenticado!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token no es valido!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id`=? ";
    db.query(q, [postId], (err, data) => {
      if (err)
        return res.status(403).json("Tú puedes borrar unicamente tus posts!");
      return res.json("El Post ha sido eliminado");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("No autenticado!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    const postId = req.params.id;
    if (err) return res.status(403).json("Token no es valido!");
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? ";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("El post ha sido actualizado");
    });
  });
};

export const likePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("No autenticado!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token no es válido!");
    const usuId = userInfo.id;
    const postId = req.params.id;
    const q = "UPDATE posts SET post_likes = post_likes + 1 WHERE id = ? ";
    const q2 = "INSERT INTO likes (`usu_id`, `post_id`, `b_like`) VALUES (?, ?, 1)";

    db.query(q, [postId], (err, data) => {
      if (err) return res.status(500).json(err);
      db.query(q2, [usuId, postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("El post ha sido actualizado");
      });
    });

  });
}

export const dislikePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("No autenticado!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token no es válido!");
    const usuId = userInfo.id;
    const postId = req.params.id;
    const q = "UPDATE posts SET post_dislikes = post_dislikes + 1 WHERE id = ? ";
    const q2 = "INSERT INTO likes (`usu_id`, `post_id`, `b_like`) VALUES (?, ?, 0)";

    db.query(q, [postId], (err, data) => {
      if (err) return res.status(500).json(err);
      db.query(q2, [usuId, postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("El post ha sido actualizado");
      });
    });

  });
}
