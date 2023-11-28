import express from "express";

import http from "http";

import cors from "cors";
import router from "./src/route";

require("dotenv").config();

const app = express();

const server = new http.Server(app);

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const PORT = 8000;

app.use("/", router);

server.listen(PORT, () => {
  console.log(`servrt run on ${PORT}`);
});
