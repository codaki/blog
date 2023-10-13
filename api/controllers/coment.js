import { db } from "../db.js"
import jwt from "jsonwebtoken";

export const getComments = (req, res) => {
    const q = 
    "select c.id, u.username, c.coment,c.date from coment c inner join users u on c.idU = u.id where c.pid=?"

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(data)
        return res.status(200).json(data);
    });
}

export const addComments = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("No autenticado!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token no es valido!");
        const q = "INSERT INTO coment(`coment`, `date`, `idU`, `pid`) VALUES (?)";
        const values = [
            req.body.coment,
            req.body.date,
            userInfo.id,
            req.body.pid,
            
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("El comentario ha sido creado")

        });


    });
}