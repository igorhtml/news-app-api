import { Router } from "express";
const router = Router();

import swaggerUi from "swagger-ui-express";
import SwaggerDocument from "../../swagger.json" assert { type: "json" };

router.use("/", swaggerUi.serve);

router.get("/", swaggerUi.setup(SwaggerDocument));

export default router;
