const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");  
const dotenv = require('dotenv') 
const app = express();
  
dotenv.config()
 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(router);

const URL = process.env.URL

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.listen(8000, () => {
  console.log("Server is Running On PORT 4000");
});
