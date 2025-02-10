const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const router = require("./route");


const app = express();


// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);


app.get("/", (req, res) => {
    res.send("<h1>Backend Project Running</h1>"); 
});

// client error handling
app.use((req, res, next)=>{
    next(createError(404, "route not found"));
}); 


module.exports = app;
 