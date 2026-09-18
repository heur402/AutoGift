import crypto from "crypto";
import User from "../models/User.js";

const errorWithStatus = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const hashPassword = (password, salt = crypto.randomBytes(16).toString("hex")) =>
  `${salt}:${crypto.scryptSync(password, salt, 64).toString("hex")}`;

const matchesPassword = (password, stored) => {
  if (!stored?.includes(":")) return false;
  const [salt, expected] = stored.split(":");
  const actual = crypto.scryptSync(password, salt, 64).toString("hex");
  return expected && crypto.timingSafeEqual(Buffer.from(actual, "hex"), Buffer.from(expected, "hex"));
};

const publicUser = (user) => {
  const data = user.toObject();
  delete data.passwordHash;
  return data;
};

export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) throw errorWithStatus("Name, email, phone, and password are required", 400);
    const user = await User.create({ id: `u-${Date.now()}`, name, email, phone, passwordHash: hashPassword(password) });
    res.status(201).json(publicUser(user));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, phone } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user || !matchesPassword(password || "", user.passwordHash)) throw errorWithStatus("Invalid email or password", 401);
    if (user.role === "user" && user.phone !== phone) throw errorWithStatus("The phone number does not match this account", 401);
    if (user.status === "blocked") throw errorWithStatus("This account is blocked", 403);
    res.json(publicUser(user));
  } catch (error) {
    next(error);
  }
};

export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, phone, password, secretKey } = req.body;
    if (!secretKey || secretKey !== process.env.ADMIN_SECRET_KEY) throw errorWithStatus("Invalid admin secret key", 403);
    const user = await User.create({ id: `a-${Date.now()}`, name, email, phone, passwordHash: hashPassword(password), role: "admin", verified: true });
    res.status(201).json(publicUser(user));
  } catch (error) {
    next(error);
  }
};
