import express from "express";
import db from "./config/dbConnect.js";
import {livroRouter} from "./routes/livroRoutes.js";
import {autorRouter} from "./routes/autorRoutes.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();

app.use(express.json());

app.use("/livros", livroRouter);
app.use("/autores", autorRouter);

export default app;
