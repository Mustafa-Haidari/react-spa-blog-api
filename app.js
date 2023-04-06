const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connectionDB = require("./db");
require("dotenv").config();

// MongoDB config
connectionDB();

// import routes
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

// app middleware
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// middleware routes
app.use("/api", userRoutes);
app.use("/api", blogRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
