const express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());
app.use(express.json());
require("dotenv").config({ path: "./config/.env" });

//Reading the image
app.use("/uploads", express.static(__dirname + "/uploads"));
const Port = process.env.port || 9000;
const connect = require("./config/DB");
connect();
app.use(express.json());
app.use("/auth", require("./routes/authRoutes"));
app.use("/product", require("./routes/productRoutes"));

app.use("/review", require("./routes/reviewroutes"));

app.listen(Port, (error) =>
  error
    ? console.log(error.message)
    : console.log("this server is running on" + Port)
);
