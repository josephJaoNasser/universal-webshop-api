"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/api/ping", (req, res) => {
    return res
        .status(200)
        .send("PING PING PING! Successfully connected to API! This is the connection test route");
});
exports.default = router;
