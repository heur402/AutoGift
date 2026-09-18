import Notification from "../models/Notification.js";
import User from "../models/User.js";

const errorWithStatus = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const listNotifications = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.read !== undefined) filter.read = req.query.read === "true";
    const notifications = await Notification.find(filter).sort({ date: -1, id: 1 });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

export const getNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({ id: req.params.id });
    if (!notification) throw errorWithStatus("Notification not found", 404);
    res.json(notification);
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (req, res, next) => {
  try {
    if (!req.body.message?.trim()) {
      throw errorWithStatus("message is required", 400);
    }
    if (req.body.userId && !(await User.exists({ id: req.body.userId }))) {
      throw errorWithStatus("User not found", 404);
    }

    const notification = await Notification.create({
      id: req.body.id || `n-${Date.now()}`,
      userId: req.body.userId || null,
      message: req.body.message,
      read: req.body.read || false,
      date: req.body.date || new Date(),
    });
    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

export const updateNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true, omitUndefined: true }
    );
    if (!notification) throw errorWithStatus("Notification not found", 404);
    res.json(notification);
  } catch (error) {
    next(error);
  }
};

export const markNotificationRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { id: req.params.id },
      { read: true },
      { new: true }
    );
    if (!notification) throw errorWithStatus("Notification not found", 404);
    res.json(notification);
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndDelete({ id: req.params.id });
    if (!notification) throw errorWithStatus("Notification not found", 404);
    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    next(error);
  }
};
