import express from "express";
import { register, getUsers, loginUser, logoutUser} from "../controllers/userController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/get", getUsers)



export default router;