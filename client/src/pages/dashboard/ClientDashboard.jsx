import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import Container from "../../components/ui/Container";
import StatCard from "../../components/ui/StatCard";
import EmptyState from "../../components/ui/EmptyState";

const ClientDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get("/orders/my").then(res => setOrders(res.data));
    }, []);

    const totalOrders = orders.length;
    const completed = orders.filter(o => o.status === "completed").length;
    const active = orders.filter(o => o.status !== "completed").length;
    const totalSpent = orders.reduce(
        (sum, o) => o.paymentStatus === "paid" ? sum + o.price : sum,
        0
    );

    return (
        <Container>
            <h1 className="text-3xl font-bold mb-8">Client Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Orders" value={totalOrders} />
                <StatCard title="Active Orders" value={active} />
                <StatCard title="Completed" value={completed} />
                <StatCard title="Total Spent" value={`$${totalSpent}`} />
            </div>

            {/* Orders List */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

                {orders.length === 0 ? (
                    <EmptyState text="You haven’t placed any orders yet." />
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div
                                key={order._id}
                                className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-800">
                                            {order.gig?.title}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Seller: {order.seller?.name}
                                        </p>
                                    </div>

                                    <span
                                        className={`px-3 py-1 text-xs rounded-full ${
                                            order.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                        Payment:{" "}
                                        <span className="font-medium">
                                            {order.paymentStatus}
                                        </span>
                                    </div>

                                    <Link
                                        to={`/chat/${order._id}`}
                                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition"
                                    >
                                        Open Chat
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ClientDashboard;
