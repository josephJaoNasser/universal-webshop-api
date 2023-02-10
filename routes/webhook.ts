import { AxiosError } from "axios";
import express from "express";
import { Params } from "@/controllers";
import verifyStore from "../middleware/verifyStore";

const router = express.Router();

router.post("/api/webhook", async (req, res) => {
  
})

export default router