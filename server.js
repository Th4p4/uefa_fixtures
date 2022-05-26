const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/index_route");
const mongoose = require("mongoose");
const HttpError = require("./model/http_error");
const fs = require('fs')

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

app.use((req, res, next) => {
  error = new HttpError("Page not found", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path,(err)=>{
      // console.log(err,'hisasa')
    })
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "unknown error occured" });
});

mongoose
  .connect(
    "mongodb://localhost:27017/uefa"
  )
  .then(() => {app.listen(5000)
console.log('connected')}
  )
  .catch((error) => console.log("error", error));
