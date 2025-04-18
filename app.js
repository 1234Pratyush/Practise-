const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect");
require("dotenv").config();

connectDB();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./src/routes/authRoutes"));
app.use("/", require("./src/routes/todoRoutes"));

app.listen(3000, () => console.log("Server running on port 3000"));
