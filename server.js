const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/index_route");
const mongoose = require("mongoose");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
  next();
});

app.use("/api", router);

mongoose
  .connect(
    "mongodb://localhost:27017/uefa"
  )
  .then(() => {app.listen(5000)
console.log('connected')}
  )
  .catch((error) => console.log("error", error));
