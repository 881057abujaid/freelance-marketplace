import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route for testing
app.use("/api/test", testRoutes);

//User Route
app.use("/api/users", userRoutes);

//Route for Gigs
app.use("/api/gigs", gigRoutes);

// Route for Orders
app.use("/api/orders", orderRoutes);

// Route for Reviews
app.use("/api/reviews", reviewRoutes);

// Route for Image upload
app.use("/api/upload", uploadRoutes);

// Subscribe route
app.use("/api/subscribe", subscriptionRoutes);

// Messaages routes
app.use("/api/messages", messageRoutes);

// Route for image avatar image save
app.use("/uploads", express.static("uploads"));

//Default Route
app.get("/", (req, res) => {
    res.send("API is Running");
});

export default app;