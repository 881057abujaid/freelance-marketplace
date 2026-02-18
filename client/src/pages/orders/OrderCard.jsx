import { Link } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";

const OrderCard = ({
    order,
    userId,
    onPay,
    onMarkPaid,
    onComplete
}) => {

    return (
        <div className="bg-white border border-slate-100 p-4 rounded-lg shadow-sm">

            {/* Header */}
            <div className="flex justify-between">
                <div>
                    <h3 className="font-medium text-slate-800">
                        {order.gig?.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {order.seller?.name}
                    </p>
                </div>

                <span className="text-sm text-gray-500 capitalize">
                    {order.paymentStatus}
                </span>
            </div>

            {/* Actions */}
            <div className="mt-3 flex gap-2 flex-wrap">

                <Link
                    to={`/chat/${order._id}`}
                    className="px-3 py-1 border rounded-md"
                >
                    Chat 💬
                </Link>

                {order.paymentStatus === "unpaid" && (
                    <>
                        <button
                            onClick={() => onPay(order._id)}
                            className="bg-primary text-white px-3 py-1 rounded"
                        >
                            Pay
                        </button>

                        <button
                            onClick={() => onMarkPaid(order._id)}
                            className="border px-3 py-1 rounded"
                        >
                            Mark Paid
                        </button>
                    </>
                )}

                {order.paymentStatus === "paid" &&
                    order.status !== "completed" &&
                    order.seller?._id === userId && (
                        <button
                            onClick={() => onComplete(order._id)}
                            className="bg-primary text-white px-3 py-1 rounded"
                        >
                            Complete
                        </button>
                    )}
            </div>

            {/* Reviews */}
            {order.status === "completed" &&
                order.buyer?._id === userId && (
                    <div className="mt-3">
                        <Reviews
                            freelancerId={order.seller._id}
                            orderId={order._id}
                        />
                    </div>
                )}

        </div>
    );
};

export default OrderCard;
