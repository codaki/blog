import {
    likePost,
    dislikePost,
} from "../controllers/post.js";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

describe('Post Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: { id: 1 },
            cookies: { access_token: "valid_token" },
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    test('likePost - should like a post', async () => {
        // Mock de la verificación de JWT
        jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
            callback(null, { id: 1 }); // Mock de la información del usuario
        });

        // Mock los queries dentro de la base de datos
        jest.spyOn(db, 'query').mockImplementation((q, values, callback) => {
            if (q.includes('UPDATE posts SET post_likes')) {
                callback(null, { affectedRows: 1 });
            } else if (q.includes('INSERT INTO likes')) {
                callback(null, { affectedRows: 1 });
            }
        });

        await likePost(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("El post ha sido actualizado");
    });

    test('dislikePost - should dislike a post', async () => {
        // Mock de la verficiación de JWT
        jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
            callback(null, { id: 1 }); // Mock de la información del usuario
        });

        // Mock los queries de la base de datos
        jest.spyOn(db, 'query').mockImplementation((q, values, callback) => {
            if (q.includes('UPDATE posts SET post_dislikes')) {
                callback(null, { affectedRows: 1 });
            } else if (q.includes('INSERT INTO likes')) {
                callback(null, { affectedRows: 1 });
            }
        });

        await dislikePost(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("El post ha sido actualizado");
    });

    test('likePost - should not like a non-existing post', async () => {
        // Mock de la verficiacióndde JWT
        jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
            callback(null, { id: 1 }); // Mock de la información del usuario
        });

        // Mock los queries de la base de datos
        jest.spyOn(db, 'query').mockImplementation((q, values, callback) => {
            if (q.includes('UPDATE posts SET post_likes')) {
                callback(new Error("Post not found"), null);
            }
        });

        await likePost(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
    });

    test('dislikePost - should not dislike a non-existing post', async () => {
        // Mock de la verficiacióndde JWT
        jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
            callback(null, { id: 1 }); // Mock de la información del usuario
        });

        // Mock los queries de la base de datos
        jest.spyOn(db, 'query').mockImplementation((q, values, callback) => {
            if (q.includes('UPDATE posts SET post_dislikes')) {
                callback(new Error("Post not found"), null);
            }
        });

        await dislikePost(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});
