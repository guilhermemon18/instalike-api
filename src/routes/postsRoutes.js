import cors from "cors";
import express from "express";
import multer from "multer";
import {
  atualizarNovoPost,
  listarPosts,
  postarNovoPost,
  uploadImagem,
} from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));
  //rota para buscar todos os posts
  app.get("/posts", listarPosts);
  //rota para criar um post
  app.post("/posts", postarNovoPost);
  //middleware, pequeno programa que vai no meio da requisição (Multer) para enviar imagens:
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;
