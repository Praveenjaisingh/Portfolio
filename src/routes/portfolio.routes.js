const express = require("express");
const router = express.Router();

const portfolio = require('../controllers/portfolio.controller');

router.post("/sendMail", portfolio.sendEmail);


module.exports = router;
