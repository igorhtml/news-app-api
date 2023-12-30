import express from "express";
import userRoute from "./src/routes/user.route";
import connectDatabase from "./src/database/database";

var app = express();

const port = 3000;

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
