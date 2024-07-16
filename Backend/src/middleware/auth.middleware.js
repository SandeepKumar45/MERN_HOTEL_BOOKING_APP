import jwt from "jsonwebtoken";


const verifyToken = (req, res, next) => {
const { refreshToken } = req.cookies
  if (!refreshToken) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default verifyToken;