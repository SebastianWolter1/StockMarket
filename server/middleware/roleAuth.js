import User from "../models/User.js";

const roleBuy = async (req, res, next) => {
    const user = await User.findById(req.user.userId)
    const role = user.role;
    if (role === "company") {
        return res.status(401).json({ msg: "unauthorized" });
    }
    next();
}

const roleSell = async (req, res, next) => {
    const user = await User.findById(req.user.userId)
    const role = user.role;
    if (role === "investor") {
        return res.status(401).json({ msg: "unauthorized" });
    }
    next();
}

export { roleBuy, roleSell }