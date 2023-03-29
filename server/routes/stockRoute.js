import express from "express";
import {
  addStock,
  buyStock,
  getStocks,
  removeStock,
  sellStock,
} from "../controllers/stockcontroller.js";
import authenticate from "../middleware/authenticate.js";
import { roleBuy, roleSell } from "../middleware/roleAuth.js";

const router = express.Router();

router.get("/allstock", authenticate, getStocks);
router.post("/addstock", authenticate, roleSell, addStock);
router.post("/sellstock", authenticate, roleBuy, sellStock);
router.post("/buystock", authenticate, roleBuy, buyStock);
router.delete("/deletestock", authenticate, roleSell, removeStock);

// router.get("/allstock", getStocks);
// router.post("/addstock", addStock);
// router.post("/sellstock", sellStock);
// router.post("/buystock", buyStock);
// router.delete("/deletestock", removeStock);

export default router;
