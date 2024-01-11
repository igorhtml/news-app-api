import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  findById,
  findLast,
  searchByTittle,
} from "../controllers/news.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", findLast);
router.get("/search", searchByTittle);
router.get("/:id", authMiddleware, findById);

export default router;
