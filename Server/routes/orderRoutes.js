import express from "express";

import {
  getOrders,
  placeOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getOrders);

router.post("/", placeOrder);

router.delete("/:id", deleteOrder);

export default router;