import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import userService from "../services/user.service.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      console.log("1");
      return res.send(401);
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2) {
      console.log("2");
      return res.send(401);
    }

    const [schema, token] = parts;
    if (schema !== "Bearer") {
      console.log("3");
      return res.send(401);
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        console.log("4");
        return res.status(401).send({ message: "Invalid token" });
      }

      const user = await userService.findByIdUserService(decoded.id);
      if (!user || !user.id) {
        return res.status(400).send({ message: "Invalid token" });
      }

      req.userId = decoded.id;
      return next();
      // console.log(req.userId.id);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
