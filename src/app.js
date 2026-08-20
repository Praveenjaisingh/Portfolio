require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();

app.use(cors());
app.use(express.json()); 

app.use(express.static(path.join(__dirname, "../public")));

const portfolioRoutes = require("./routes/portfolio.routes");
app.use("/api", portfolioRoutes); 

app.use((err, req, res, next) => {
    console.error("❌ Error:", err);

    return res.status(400).json({
        status: false,
        message: err.message || "Something went wrong"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
