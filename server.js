const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const router = require("./routes/index_route");
const mongoose = require("mongoose");
const HttpError = require("./model/http_error");
const fs = require("fs");
require('dotenv').config();
// const cors = require("cors");

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, { cors: { origin: "*" } });
app.use(bodyParser.json());
// console.log(Server.c);
// io.cors = { origin: "*" };
io.on("connection", (socket) => {
  socket.on("clickedItem", (item) => {
    socket.broadcast.emit("clickedItem", item);
  });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Orgin","*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
  next();
});

app.use("/api", router);

app.use((req, res, next) => {
  error = new HttpError("Page not found", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      // console.log(err,'hisasa')
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "unknown error occured" });
});
// console.log(process.env.DB_NAMES,'hhs',process.env.REACT_APP_USER_NAME)
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6pkgt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    server.listen(process.env.PORT||5000);
    console.log("connected");
  })
  .catch((error) => console.log("error", error));
