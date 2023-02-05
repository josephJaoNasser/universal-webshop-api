import express, { Express } from "express";
import dotenv from "dotenv";

const app: Express = express();
dotenv.config();

// ==== MIDDLEWARE ==== //
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ==== SERVER CONNECTION TEST ==== //
import ping from "./routes/ping";

app.use(ping);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send(
      "Successfully connected to API! You are at the index route since you either didn't enter a route, or the route you put in is invalid"
    );
});

// ==== ROUTES ==== //
import categories from "./routes/categories"
import products from "./routes/products"

app.use(categories);
app.use(products);

// ==== SERVER START ==== //
const port = process.env.PORT || 3210;

app.listen(port, () => {
  console.log("App listening on port " + port);
});
