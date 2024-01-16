import { Router } from "express";

import userController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/create/", userController.create);
router.get("/findAll/", userController.findAll);
router.get("/findById/:id", validId, validUser, userController.findById);
router.patch("/update/:id", validId, validUser, userController.update);

export default router;
