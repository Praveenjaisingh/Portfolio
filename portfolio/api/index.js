const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const path = require("path");

const portfolioRoutes = require("../src/routes/portfolio.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use("/api", portfolioRoutes);

module.exports.handler = serverless(app);