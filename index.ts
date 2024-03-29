import express, { Express } from "express";
import dotenv from "dotenv";

const app: Express = express();
dotenv.config();

// ==== MIDDLEWARE ==== //
import bodyParser from "body-parser";
import cors from "cors";

const corsOptions = {
  origin: true,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

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
import categories from "./routes/categories";
import products from "./routes/products";
import cart from "./routes/cart";
import webhook from "./routes/webhook";
import sync from "./routes/sync";

app.use(categories);
app.use(products);
app.use(webhook);
app.use(cart);
app.use(sync);

// ==== SERVER START ==== //
const port = process.env.PORT || 3210;

app.listen(port, () => {
  console.log("App listening on port " + port);
});
