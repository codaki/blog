import express from "express";
import { getComments, addComments } from "../controllers/coment.js";

const router = express.Router();

router.get("/:id", getComments);
router.post("/", addComments);

export default router;
