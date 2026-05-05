const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const path = require("path");

const portfolioRoutes = require("../src/routes/portfolio.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", portfolioRoutes);

module.exports.handler = serverless(app);