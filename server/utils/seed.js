import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Notification from "../models/Notification.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const image = (seed) => `https://picsum.photos/seed/${seed}/800/800`;

const products = [
  { id: "p-001", name: "Wireless Headphones", price: 89.99, currency: "USD", category: "Audio", rating: 4.6, images: [image("p001a"), image("p001b"), image("p001c")], description: "Over-ear Bluetooth headphones with active noise cancellation and 30-hour battery life." },
  { id: "p-002", name: "Mechanical Keyboard", price: 129.00, currency: "USD", category: "Peripherals", rating: 4.8, images: [image("p002a"), image("p002b")], description: "Hot-swappable mechanical keyboard with RGB backlighting and tactile switches." },
  { id: "p-003", name: "Gaming Mouse", price: 59.50, currency: "USD", category: "Peripherals", rating: 4.4, images: [image("p003a")], description: "Lightweight gaming mouse with a 16K DPI optical sensor and programmable buttons." },
  { id: "p-004", name: "27\" 4K Monitor", price: 349.00, currency: "USD", category: "Displays", rating: 4.7, images: [image("p004a"), image("p004b"), image("p004c"), image("p004d")], description: "27-inch UHD IPS monitor with HDR support and slim bezels." },
  { id: "p-005", name: "USB-C Hub", price: 45.00, currency: "USD", category: "Accessories", rating: 4.3, images: [image("p005a"), image("p005b")], description: "7-in-1 USB-C hub with HDMI, SD card reader, and 100W pass-through charging." },
  { id: "p-006", name: "Bluetooth Speaker", price: 74.99, currency: "USD", category: "Audio", rating: 4.5, images: [image("p006a"), image("p006b"), image("p006c")], description: "Portable waterproof speaker with rich bass and 12-hour playtime." },
  { id: "p-007", name: "Webcam 1080p", price: 69.00, currency: "USD", category: "Video", rating: 4.2, images: [image("p007a")], description: "Full HD webcam with autofocus and built-in dual microphones." },
  { id: "p-008", name: "Laptop Stand", price: 39.99, currency: "USD", category: "Accessories", rating: 4.6, images: [image("p008a"), image("p008b")], description: "Aluminum adjustable laptop stand for better ergonomics and airflow." },
  { id: "p-009", name: "External SSD 1TB", price: 119.00, currency: "USD", category: "Storage", rating: 4.9, images: [image("p009a"), image("p009b"), image("p009c"), image("p009d"), image("p009e")], description: "Portable NVMe SSD with USB 3.2 Gen 2 and read speeds up to 1050 MB/s." },
  { id: "p-010", name: "Noise-Cancel Earbuds", price: 99.00, currency: "USD", category: "Audio", rating: 4.5, images: [image("p010a"), image("p010b")], description: "True wireless earbuds with ANC, transparency mode, and wireless charging case." },
  { id: "p-011", name: "Desk Lamp LED", price: 34.50, currency: "USD", category: "Home", rating: 4.3, images: [image("p011a")], description: "Dimmable LED desk lamp with adjustable color temperature and USB port." },
  { id: "p-012", name: "Smart Watch", price: 199.00, currency: "USD", category: "Wearables", rating: 4.4, images: [image("p012a"), image("p012b"), image("p012c")], description: "Fitness smartwatch with heart-rate tracking, GPS, and 7-day battery." },
  { id: "p-013", name: "Phone Tripod", price: 24.99, currency: "USD", category: "Accessories", rating: 4.1, images: [image("p013a"), image("p013b")], description: "Flexible phone tripod with Bluetooth remote and adjustable grip." },
  { id: "p-014", name: "Power Bank 20000mAh", price: 49.99, currency: "USD", category: "Power", rating: 4.6, images: [image("p014a"), image("p014b"), image("p014c")], description: "High-capacity power bank with dual USB-A and USB-C fast charging." },
  { id: "p-015", name: "Gaming Chair", price: 229.00, currency: "USD", category: "Furniture", rating: 4.2, images: [image("p015a"), image("p015b"), image("p015c"), image("p015d")], description: "Ergonomic gaming chair with lumbar support and reclining backrest." },
  { id: "p-016", name: "Wireless Charger", price: 29.00, currency: "USD", category: "Power", rating: 4.3, images: [image("p016a")], description: "15W Qi wireless charging pad with anti-slip surface." },
  { id: "p-017", name: "HDMI Cable 2m", price: 12.99, currency: "USD", category: "Cables", rating: 4.7, images: [image("p017a"), image("p017b")], description: "High-speed HDMI 2.1 cable supporting 4K at 120Hz and 8K at 60Hz." },
  { id: "p-018", name: "Streaming Mic", price: 109.00, currency: "USD", category: "Audio", rating: 4.5, images: [image("p018a"), image("p018b"), image("p018c")], description: "USB condenser microphone with cardioid pickup and zero-latency monitoring." },
  { id: "p-019", name: "Monitor Arm", price: 79.00, currency: "USD", category: "Accessories", rating: 4.4, images: [image("p019a"), image("p019b")], description: "Single-monitor gas-spring arm with tilt, swivel, and rotation." },
  { id: "p-020", name: "Desk Mat XL", price: 27.50, currency: "USD", category: "Accessories", rating: 4.6, images: [image("p020a"), image("p020b"), image("p020c")], description: "Large stitched-edge desk mat with a smooth, water-resistant surface." },
];

const users = [
  { id: "u-1001", name: "Alice M.", email: "alice@example.com", joined: "2026-01-04", orders: 6, spent: 428.5, status: "active" },
  { id: "u-1002", name: "Brian K.", email: "brian@example.com", joined: "2026-01-08", orders: 3, spent: 149.0, status: "active" },
  { id: "u-1003", name: "Carla N.", email: "carla@example.com", joined: "2026-01-11", orders: 8, spent: 902.7, status: "active" },
  { id: "u-1004", name: "David O.", email: "david@example.com", joined: "2026-01-15", orders: 1, spent: 39.99, status: "blocked" },
  { id: "u-1005", name: "Ella P.", email: "ella@example.com", joined: "2026-01-19", orders: 4, spent: 210.0, status: "active" },
  { id: "u-1006", name: "Frank Q.", email: "frank@example.com", joined: "2026-01-22", orders: 0, spent: 0, status: "active" },
  { id: "u-1007", name: "Grace R.", email: "grace@example.com", joined: "2026-01-25", orders: 2, spent: 118.5, status: "active" },
  { id: "u-1008", name: "Henry S.", email: "henry@example.com", joined: "2026-01-29", orders: 5, spent: 376.2, status: "blocked" },
  { id: "u-1009", name: "Ivy T.", email: "ivy@example.com", joined: "2026-02-02", orders: 7, spent: 611.4, status: "active" },
  { id: "u-1010", name: "Jack U.", email: "jack@example.com", joined: "2026-02-05", orders: 3, spent: 199.0, status: "active" },
];

const orders = [
  { id: "o-5001", userId: "u-1001", product: "Wireless Headphones", productId: "p-001", amount: 89.99, date: "2026-02-10", status: "delivered" },
  { id: "o-5002", userId: "u-1003", product: "27\" 4K Monitor", productId: "p-004", amount: 349.0, date: "2026-02-10", status: "shipped" },
  { id: "o-5003", userId: "u-1009", product: "Smart Watch", productId: "p-012", amount: 199.0, date: "2026-02-09", status: "delivered" },
  { id: "o-5004", userId: "u-1002", product: "Mechanical Keyboard", productId: "p-002", amount: 129.0, date: "2026-02-09", status: "pending" },
  { id: "o-5005", userId: "u-1005", product: "Gaming Chair", productId: "p-015", amount: 229.0, date: "2026-02-08", status: "delivered" },
  { id: "o-5006", userId: "u-1007", product: "External SSD 1TB", productId: "p-009", amount: 119.0, date: "2026-02-08", status: "shipped" },
  { id: "o-5007", userId: "u-1004", product: "Laptop Stand", productId: "p-008", amount: 39.99, date: "2026-02-07", status: "cancelled" },
  { id: "o-5008", userId: "u-1008", product: "Streaming Mic", productId: "p-018", amount: 109.0, date: "2026-02-07", status: "delivered" },
  { id: "o-5009", userId: "u-1010", product: "Power Bank 20000mAh", productId: "p-014", amount: 49.99, date: "2026-02-06", status: "delivered" },
  { id: "o-5010", userId: "u-1001", product: "Gaming Mouse", productId: "p-003", amount: 59.5, date: "2026-02-06", status: "delivered" },
  { id: "o-5011", userId: "u-1003", product: "Bluetooth Speaker", productId: "p-006", amount: 74.99, date: "2026-02-05", status: "delivered" },
  { id: "o-5012", userId: "u-1009", product: "Noise-Cancel Earbuds", productId: "p-010", amount: 99.0, date: "2026-02-05", status: "shipped" },
  { id: "o-5013", userId: "u-1006", product: "HDMI Cable 2m", productId: "p-017", amount: 12.99, date: "2026-02-04", status: "delivered" },
  { id: "o-5014", userId: "u-1005", product: "Desk Mat XL", productId: "p-020", amount: 27.5, date: "2026-02-03", status: "delivered" },
  { id: "o-5015", userId: "u-1010", product: "Webcam 1080p", productId: "p-007", amount: 69.0, date: "2026-02-02", status: "pending" },
];

const notifications = [
  { id: "a-1", userId: "u-1003", message: "Order o-5002 marked as shipped", read: false },
  { id: "a-2", userId: "u-1004", message: "User David O. was blocked", read: false },
  { id: "a-3", userId: "u-1010", message: "New order o-5015 placed by Jack U.", read: false },
  { id: "a-4", userId: "u-1001", message: "Notification sent to Alice M.", read: false },
  { id: "a-5", userId: "u-1004", message: "Order o-5007 cancelled by user", read: true },
];

const seed = async () => {
  await connectDB();
  await Promise.all([
    Product.deleteMany({}),
    User.deleteMany({}),
    Order.deleteMany({}),
    Notification.deleteMany({}),
  ]);
  await Product.insertMany(products);
  await User.insertMany(users);
  await Order.insertMany(orders);
  await Notification.insertMany(notifications);
  console.log(`Seeded ${products.length} products, ${users.length} users, ${orders.length} orders, ${notifications.length} notifications`);
  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error(`Unable to seed database: ${error.message}`);
  await mongoose.disconnect();
  process.exitCode = 1;
});
