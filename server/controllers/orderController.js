import stripe from "../config/stripe.js";
import Gig from "../models/Gig.js";
import Order from "../models/Order.js";

// Create order (client only)
export const createOrder = async (req, res) => {
    try {
        const { gigId, package: pkg } = req.body;

        const gig = await Gig.findById(gigId);

        if (!gig) return res.status(404).json({ message: "Gig not found" });

        // determine price based on package selection
        const base = Number(gig.price || 0);
        let price = base;
        if (pkg === 'standard') price = Math.round(base * 1.5);
        if (pkg === 'premium') price = Math.round(base * 2);

        const order = await Order.create({
            gig: gig._id,
            buyer: req.user.id,
            seller: gig.freelancer,
            price,
            package: pkg || 'basic',
        });

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// My Orders
export const getMyOrders = async (req, res) => {
    const orders = await Order.find({
        $or: [{ buyer: req.user.id }, { seller: req.user.id }],
    })
        .populate("gig")
        .populate("buyer", "name email")
        .populate("seller", "name email");

    res.json(orders);
};

// Update status
export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.seller.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not allowed" });
    }

    order.status = status;

    await order.save();

    res.json(order);
};

// Create checkout
export const createCheckoutSession = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: "Order not found" });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],

            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Freelance Gig Payment",
                        },
                        unit_amount: order.price * 100,
                    },
                    quantity: 1,
                },
            ],

            mode: "payment",

            success_url: `${process.env.CLIENT_URL}/orders`,
            cancel_url: `${process.env.CLIENT_URL}/orders`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Mark order paid
export const markOrderPaid = async (req, res) => {
    const order = await Order.findById(req.params.id);

    order.paymentStatus = "paid";
    order.status = "active";

    await order.save();

    res.json(order);
}

// Mark Order Completed
export const markOrderCompleted = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "completed";

    await order.save();

    res.json({ message: "Order completed successfully" })
}

//Get seller orders
export const getSellerOrders = async (req, res) => {
    const orders = await Order.find({
        seller: req.user.id
    })
        .populate("gig")
        .populate("buyer", "name");

    res.json(orders);
};