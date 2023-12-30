import express from "express";
import userRoute from "./src/routes/user.route.js";
import connectDatabase from "./src/database/database.js";

var app = express();

const port = 3000;

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
