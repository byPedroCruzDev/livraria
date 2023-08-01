import express from "express";
import AutorController from "../controller/autoresController.js";

export const autorRouter = express.Router();

autorRouter
  .get("", AutorController.listarAutores)
  .get("/:id", AutorController.listarAutorPorId)
  .post("", AutorController.cadastrarAutor)
  .put("/:id", AutorController.atualizarAutor)
  .delete("/:id", AutorController.deleteAutor);
