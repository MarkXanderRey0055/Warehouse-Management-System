const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const authRoutes =
require("./routes/authRoutes");

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Warehouse Management System Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`WMS running on port ${PORT}`);
});