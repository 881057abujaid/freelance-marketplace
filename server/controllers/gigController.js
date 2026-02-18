import Gig from "../models/Gig.js";
import Review from "../models/Review.js";

// Create Gig (freelancer only)
export const createGig = async (req, res) => {
    try {
        const gig = await Gig.create({
            ...req.body,
            freelancer: req.user.id,
        });

        res.status(201).json(gig);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all gigs
export const getAllGigs = async (req, res) => {
    const { search, min, max, category, delivery, sellerLevel } = req.query;

    let filter = {};

    // Title search
    if (search) {
        filter.title = {
            $regex: search,
            $options: "i"
        };
    }

    // Price filter
    if (min || max) {
        filter.price = {};
        if (min) filter.price.$gte = Number(min);
        if (max) filter.price.$lte = Number(max);
    }

    // Category filter
    if (category) {
        filter.category = category;
    }

    // Delivery time filter (max days)
    if (delivery) {
        filter.deliveryTime = { $lte: Number(delivery) };
    }

    // Seller level
    if (sellerLevel) {
        filter.sellerLevel = sellerLevel;
    }

    const gigs = await Gig.find(filter).populate("freelancer", "name avatar").lean().sort({ rating: -1 }).limit(8);

    const gigIds = gigs.map(g => g._id);

    const reviewStats = await Review.aggregate([
        { $match: { gigId: { $in: gigIds } } },
        {
            $group: {
            _id: "$gigId",
            avg: { $avg: "$rating" },
            count: { $sum: 1 }
            }
        }
    ]);

    const gigsWithRatings = gigs.map(gig => {
        const stats = reviewStats.find(r => r._id.toString() === gig._id.toString());

        return {
            ...gig,
            rating: stats?.avg?.toFixed(1) || 0,
            reviewsCount: stats?.count || 0
        };
    });
    res.json(gigsWithRatings);
}

// Get single gig
export const getGig = async (req, res) => {
    const gig = await Gig.findById(req.params.id).populate("freelancer");

    if (!gig) return res.status(404).json({ message: "Gig not found" });

    res.json(gig);
};

export const getMyGigs = async (req, res) => {
    try {
        const gigs = await Gig.find({
            freelancer: req.user.id
        });

        const gigIds = gigs.map(g => g._id);

        const stats = await Review.aggregate([
            { $match: { gigId: { $in: gigIds } } },
            {
                $group: {
                    _id: "$gigId",
                    avg: { $avg: "$rating" },
                    count: { $sum: 1 }
                }
            }
        ]);

        const gigsWithStats = gigs.map(gig => {
            const stat = stats.find(
                s => s._id.toString() === gig._id.toString()
            );

            return {
                ...gig.toObject(),
                rating: stat?.avg || 0,
                reviewsCount: stat?.count || 0
            };
        });

        res.json(gigsWithStats);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


// Update gig
export const updateGig = async (req, res) => {
  const gig = await Gig.findById(req.params.id);

  if (!gig) {
    return res.status(404).json({ message: "Gig not found" });
  }

  if (gig.freelancer.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  gig.title = req.body.title || gig.title;
  gig.description = req.body.description || gig.description;
  gig.price = req.body.price || gig.price;
  gig.category = req.body.category || gig.category;
  gig.deliveryTime = req.body.deliveryTime || gig.deliveryTime;

  await gig.save();

  res.json(gig);
};


// Delete Gig
export const deleteGig = async (req, res) => {
    const gig = await Gig.findById(req.params.id);

    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.freelancer.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not your gig" });
    }

    await gig.deleteOne();

    res.json({ message: "Gig delete " });
}