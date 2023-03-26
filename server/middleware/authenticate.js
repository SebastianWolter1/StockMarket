import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    console.log(req.user)
    console.log(token)
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export default authenticate;