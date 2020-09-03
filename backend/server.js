const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require("dotenv").config();

const app = express();


const uri = process.env.ATLAS_URI;
//we don't have to remember everything but put these things after uri to get latest update
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

console.log(process.env)
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

app.use(cors());
app.use(express.json());

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
