import Subscription from "../models/Subscription.js";

export const createSubscription = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const normalized = String(email).trim().toLowerCase();

        // basic email format check
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
        if (!re.test(normalized)) return res.status(400).json({ message: "Invalid email" });

        // avoid duplicates
        const exists = await Subscription.findOne({ email: normalized });
        if (exists) return res.status(200).json({ message: "Already subscribed" });

        const sub = await Subscription.create({ email: normalized });

        res.status(201).json({ message: "Subscribed", subscription: sub });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
