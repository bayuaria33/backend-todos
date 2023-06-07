const express = require("express");
const morgan = require("morgan") //logger
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const app = express();
const port = process.env.PORT || 3000;
const mainRoute = require(`./src/routes/index`);
app.use(morgan(':method :url :date[web] :status'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(
  cors({
    origin: "*",
    method: "*",
  })
);
app.use(helmet());
app.use(xss());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", mainRoute);
app.use("/", (req, res) => {
  res.status(200).json({
    status: "Connected to TODOS API Successfully, please enter the correct route",
    statusCode: 200,
  });
});

app.listen(port, () => {
  console.info(`App running on port ${port}.`);
});