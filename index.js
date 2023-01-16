const express = require("express");
const api = express();
require("dotenv").config();

// ==== MIDDLEWARE ==== //

// ==== SERVER CONNECTION TEST ==== //
const ping = require("./routes/ping");

api.use(ping);

api.get("/", (req, res) => {
  return res
    .status(200)
    .send(
      "Successfully connected to API! You are at the index route since you either didn't enter a route, or the route you put in is invalid"
    );
});

// ==== ROUTES ==== //
const categories = require("./routes/categories");
const products = require("./routes/products");

api.use(categories);
api.use(products);

// ==== SERVER START ==== //
const port = process.env.PORT || 3000;

api.listen(port, () => {
  console.log("App listening on port " + port);
});
