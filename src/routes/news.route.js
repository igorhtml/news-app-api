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

router.post("/create/", authMiddleware, create);
router.get("/findAll/", findAll);
router.get("/top", findLast);
router.get("/searchByTitle/", searchByTitle);
router.get("/searchByUser/", authMiddleware, searchByUser);
router.get("/findById/:id", authMiddleware, findById);

router.patch("/like/:id", authMiddleware, likeNews);
router.patch("/update/:id", authMiddleware, update);
router.delete("/erase/:id", authMiddleware, erase);
router.patch("/addComment/:id", authMiddleware, addComment);
router.patch(
  "/removeComment/:idNews/:idComment",
  authMiddleware,
  removeComment
);

export default router;
