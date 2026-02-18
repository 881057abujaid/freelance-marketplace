import Order from "../models/Order.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

export const createReview = async (req, res) => {
    try {
        const { orderId, rating, comment } = req.body;

        const order = await Order.findById(orderId);

        if (!order) return res.status(404).json({ message: "Order not found" });

        // Only buyer allowed
        if (order.buyer.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        // Only completed orders
        if (order.status !== "completed") {
            return res.status(400).json({ message: "Complete order first" });
        }

        const review = await Review.create({
            order: orderId,
            reviewer: req.user.id,
            freelancer: order.seller,
            rating,
            comment,
        });

        // Update freelancer rating
        const reviews = await Review.find({ freelancer: order.seller });

        const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

        await User.findByIdAndUpdate(order.seller, {
            rating: avg,
            numReviews: reviews.length,
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get freelancer reviews
export const getFreelancerReviews = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = { freelancer: req.params.id };

    const total = await Review.countDocuments(filter);
    const reviews = await Review.find(filter)
        .populate("reviewer", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const avg = total > 0 ? (await Review.aggregate([
        { $match: filter },
        { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]))[0]?.avgRating || 0 : 0;

    res.json({
        reviews,
        total,
        page,
        pages: Math.ceil(total / limit),
        avg: Number(avg.toFixed(2)),
    });
};