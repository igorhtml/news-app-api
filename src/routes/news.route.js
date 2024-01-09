import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  findById,
  findLast,
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", findLast);
router.get("/:id", findById);

export default router;
