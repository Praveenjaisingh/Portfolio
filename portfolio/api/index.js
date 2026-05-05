
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const portfolioRoutes = require("../src/routes/portfolio.routes");
app.use("/", portfolioRoutes);

module.exports.handler = serverless(app);