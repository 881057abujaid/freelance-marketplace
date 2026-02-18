import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import Container from "../../components/ui/Container";
import StatCard from "../../components/ui/StatCard";

const FreelancerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersRes = await api.get("/orders/seller");
                setOrders(ordersRes.data || []);
            } catch (err) {
                console.error("Orders error:", err);
                setOrders([]);
            }

            try {
                const gigsRes = await api.get("/gigs/my");
                setGigs(gigsRes.data || []);
            } catch (err) {
                console.error("Gigs error:", err);
                setGigs([]);
            }

            setLoading(false);
        };

        fetchData();
    },[]);


    const earnings = orders.reduce(
        (sum, o) =>
            o.paymentStatus === "paid" ? sum + o.price : sum,
        0
    );

    if (loading) {
        return (
            <Container>
                <div className="text-gray-500">Loading dashboard...</div>
            </Container>
        );
    }

    return (
        <Container>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    Freelancer Dashboard
                </h1>
                <p className="text-gray-500 mt-1">
                    Manage your gigs and track your performance
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

                <StatCard
                    title="My Gigs"
                    value={gigs.length}
                />

                <StatCard
                    title="Orders"
                    value={orders.length}
                />

                <StatCard
                    title="Earnings"
                    value={`$${earnings}`}
                    highlight
                />

            </div>

            {/* Quick Action */}
            <div className="flex justify-between items-center">

                <Link
                    to="/create-gig"
                    className="
                        bg-primary text-white
                        px-5 py-3 rounded-xl
                        shadow hover:shadow-md
                        transition
                    "
                >
                    ➕ Create New Gig
                </Link>

                {gigs.length === 0 && (
                    <div className="text-sm text-gray-500">
                        You haven't created any gigs yet.
                    </div>
                )}

            </div>

        </Container>
    );
};

export default FreelancerDashboard;
