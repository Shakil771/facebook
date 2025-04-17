const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const router = require("./route");

const app = express();

// ✅ Allowed origins list
const allowedOrigins = [
  "https://meet-google-com.onrender.com",
  "https://meet-com.onrender.com",
  "http://localhost:3000"
];

// ✅ CORS Middleware with dynamic origin check
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("<h1>Backend Project Running</h1>");
});

// client error handling
app.use((req, res, next) => {
  next(createError(404, "route not found"));
});

module.exports = app;
