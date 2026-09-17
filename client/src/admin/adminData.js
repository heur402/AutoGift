// Demo data for admin UI only. No backend, no persistence.
// Replace with real API calls later.

export const adminUsers = [
  { id: "u-1001", name: "Alice M.",  email: "alice@example.com",  joined: "2026-01-04", orders: 6, spent: 428.5, status: "active"  },
  { id: "u-1002", name: "Brian K.",  email: "brian@example.com",  joined: "2026-01-08", orders: 3, spent: 149.0, status: "active"  },
  { id: "u-1003", name: "Carla N.",  email: "carla@example.com",  joined: "2026-01-11", orders: 8, spent: 902.7, status: "active"  },
  { id: "u-1004", name: "David O.",  email: "david@example.com",  joined: "2026-01-15", orders: 1, spent: 39.99, status: "blocked" },
  { id: "u-1005", name: "Ella P.",   email: "ella@example.com",   joined: "2026-01-19", orders: 4, spent: 210.0, status: "active"  },
  { id: "u-1006", name: "Frank Q.",  email: "frank@example.com",  joined: "2026-01-22", orders: 0, spent: 0,     status: "active"  },
  { id: "u-1007", name: "Grace R.",  email: "grace@example.com",  joined: "2026-01-25", orders: 2, spent: 118.5, status: "active"  },
  { id: "u-1008", name: "Henry S.",  email: "henry@example.com",  joined: "2026-01-29", orders: 5, spent: 376.2, status: "blocked" },
  { id: "u-1009", name: "Ivy T.",    email: "ivy@example.com",    joined: "2026-02-02", orders: 7, spent: 611.4, status: "active"  },
  { id: "u-1010", name: "Jack U.",   email: "jack@example.com",   joined: "2026-02-05", orders: 3, spent: 199.0, status: "active"  },
];

export const adminOrders = [
  { id: "o-5001", userId: "u-1001", product: "Wireless Headphones", amount: 89.99,  date: "2026-02-10", status: "delivered" },
  { id: "o-5002", userId: "u-1003", product: "27\" 4K Monitor",     amount: 349.0,  date: "2026-02-10", status: "shipped"   },
  { id: "o-5003", userId: "u-1009", product: "Smart Watch",         amount: 199.0,  date: "2026-02-09", status: "delivered" },
  { id: "o-5004", userId: "u-1002", product: "Mechanical Keyboard", amount: 129.0,  date: "2026-02-09", status: "pending"   },
  { id: "o-5005", userId: "u-1005", product: "Gaming Chair",        amount: 229.0,  date: "2026-02-08", status: "delivered" },
  { id: "o-5006", userId: "u-1007", product: "External SSD 1TB",    amount: 119.0,  date: "2026-02-08", status: "shipped"   },
  { id: "o-5007", userId: "u-1004", product: "Laptop Stand",        amount: 39.99,  date: "2026-02-07", status: "cancelled" },
  { id: "o-5008", userId: "u-1008", product: "Streaming Mic",       amount: 109.0,  date: "2026-02-07", status: "delivered" },
  { id: "o-5009", userId: "u-1010", product: "Power Bank 20000mAh", amount: 49.99,  date: "2026-02-06", status: "delivered" },
  { id: "o-5010", userId: "u-1001", product: "Gaming Mouse",        amount: 59.5,   date: "2026-02-06", status: "delivered" },
  { id: "o-5011", userId: "u-1003", product: "Bluetooth Speaker",   amount: 74.99,  date: "2026-02-05", status: "delivered" },
  { id: "o-5012", userId: "u-1009", product: "Noise-Cancel Earbuds",amount: 99.0,   date: "2026-02-05", status: "shipped"   },
  { id: "o-5013", userId: "u-1006", product: "HDMI Cable 2m",       amount: 12.99,  date: "2026-02-04", status: "delivered" },
  { id: "o-5014", userId: "u-1005", product: "Desk Mat XL",         amount: 27.5,   date: "2026-02-03", status: "delivered" },
  { id: "o-5015", userId: "u-1010", product: "Webcam 1080p",        amount: 69.0,   date: "2026-02-02", status: "pending"   },
];

// Monthly revenue for the last 6 months (demo).
export const adminRevenue = [
  { month: "Sep 2025", amount: 3120.5 },
  { month: "Oct 2025", amount: 4890.0 },
  { month: "Nov 2025", amount: 5610.75 },
  { month: "Dec 2025", amount: 8420.0 },
  { month: "Jan 2026", amount: 6930.25 },
  { month: "Feb 2026", amount: 4180.4 },
];

// Short activity feed for the overview page.
export const adminActivity = [
  { id: "a-1", text: "Order o-5002 marked as shipped",     time: "2 min ago"  },
  { id: "a-2", text: "User David O. was blocked",           time: "1 hr ago"   },
  { id: "a-3", text: "New order o-5015 placed by Jack U.",  time: "3 hrs ago"  },
  { id: "a-4", text: "Notification sent to Alice M.",       time: "5 hrs ago"  },
  { id: "a-5", text: "Order o-5007 cancelled by user",      time: "Yesterday"  },
];