const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const portfolioRoutes = require("../src/routes/portfolio.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", portfolioRoutes);

module.exports.handler = serverless(app);