"use strict";

//  استيراد المكتبات المطلوبة | import the required libraries
//  تأكد من تنزيل الوحدات المطلوبة | make sure to download the required modules
const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const routes = require("./routes/route.js");

const mongoURI = "mongodb://127.0.0.1:27017/schole";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  const app = express();
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(routes);
  const port = process.env.PORT || 5000;
  app.listen(port);
}).catch(err => console.log(err)); // لا تنسى تحديد وظيفة الخادم | don't forget to define the server function that listens to requests