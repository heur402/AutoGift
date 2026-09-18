import Order from "../models/Order.js";

const monthLabel = (date) =>
  date.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export const getRevenueSummary = async (req, res, next) => {
  try {
    const now = new Date();
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 1));
    const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));

    const aggregated = await Order.aggregate([
      {
        $match: {
          date: { $gte: start, $lt: end },
          status: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date", timezone: "UTC" } },
          amount: { $sum: "$amount" },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const byMonth = new Map(
      aggregated.map((entry) => [
        entry._id,
        { amount: Number(entry.amount.toFixed(2)), orderCount: entry.orderCount },
      ])
    );
    const months = [];
    for (let offset = 0; offset < 6; offset += 1) {
      const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5 + offset, 1));
      const key = date.toISOString().slice(0, 7);
      const value = byMonth.get(key) || { amount: 0, orderCount: 0 };
      months.push({ month: monthLabel(date), key, ...value });
    }

    const total = Number(months.reduce((sum, month) => sum + month.amount, 0).toFixed(2));
    const orderCount = months.reduce((sum, month) => sum + month.orderCount, 0);
    const bestMonth = months.reduce(
      (best, month) => (month.amount > best.amount ? month : best),
      months[0]
    );

    res.json({
      months,
      revenue: months,
      total,
      average: Number((total / 6).toFixed(2)),
      orderCount,
      averageOrderValue: orderCount ? Number((total / orderCount).toFixed(2)) : 0,
      bestMonth,
    });
  } catch (error) {
    next(error);
  }
};
