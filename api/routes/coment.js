import express  from "express";
import { getComments } from "../controllers/coment.js";
import { addComments } from "../controllers/coment.js";

const router = express.Router();

router.get("/:id", getComments);
router.post("/", addComments);

export default router;
