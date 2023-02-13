"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// ==== MIDDLEWARE ==== //
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: true,
};
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(corsOptions));
// ==== SERVER CONNECTION TEST ==== //
const ping_1 = __importDefault(require("./routes/ping"));
app.use(ping_1.default);
app.get("/", (req, res) => {
    return res
        .status(200)
        .send("Successfully connected to API! You are at the index route since you either didn't enter a route, or the route you put in is invalid");
});
// ==== ROUTES ==== //
const categories_1 = __importDefault(require("./routes/categories"));
const products_1 = __importDefault(require("./routes/products"));
const cart_1 = __importDefault(require("./routes/cart"));
const webhook_1 = __importDefault(require("./routes/webhook"));
app.use(categories_1.default);
app.use(products_1.default);
app.use(webhook_1.default);
app.use(cart_1.default);
// ==== SERVER START ==== //
const port = process.env.PORT || 3210;
app.listen(port, () => {
    console.log("App listening on port " + port);
});
