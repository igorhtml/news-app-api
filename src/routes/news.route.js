import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  findById,
  findLast,
  searchByTitle,
  searchByUser,
  update,
  erase,
  likeNews,
  addComment,
  removeComment,
} from "../controllers/news.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", findLast);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, searchByUser);
router.get("/:id", authMiddleware, findById);

router.patch("/like/:id", authMiddleware, likeNews);
router.patch("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, erase);
router.patch("/comment/:id", authMiddleware, addComment);
router.patch("/comment/:idNews/:idComment", authMiddleware, removeComment);

export default router;
