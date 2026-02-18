import { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import OrderCard from "./OrderCard";
import { useAuth } from "../../hooks/useAuth";

import {
    getMyOrders,
    checkoutOrder,
    markPaid,
    completeOrder
} from "../../services/orderService";

const Orders = () => {
    const { user } = useAuth();

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const res = await getMyOrders();
        setOrders(res.data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handlePay = async (id) => {
        const res = await checkoutOrder(id);
        window.location.href = res.data.url;
    };

    return (
        <Container>

            <h1 className="text-2xl font-bold mb-6">
                My Orders
            </h1>

            <div className="space-y-4">

                {orders.map(order => (
                    <OrderCard
                        key={order._id}
                        order={order}
                        userId={user?.id}
                        onPay={handlePay}
                        onMarkPaid={async (id) => {
                            await markPaid(id);
                            fetchOrders();
                        }}
                        onComplete={async (id) => {
                            await completeOrder(id);
                            fetchOrders();
                        }}
                    />
                ))}

            </div>

        </Container>
    );
};

export default Orders;
