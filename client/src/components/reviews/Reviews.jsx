import { useEffect, useState } from "react";
import api from "../../services/api";

import Container from "../ui/Container";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

const Reviews = ({ freelancerId, orderId }) => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [avg, setAvg] = useState(0);

    const limit = 5;

    const fetchReviews = async (p = 1) => {
        const res = await api.get(
            `/reviews/${freelancerId}?page=${p}&limit=${limit}`
        );

        setReviews(res.data.reviews || res.data);
        setPages(res.data.pages || 1);
        setPage(res.data.page || p);
        setAvg(res.data.avg || 0);
    };

    useEffect(() => {
        if (freelancerId) fetchReviews(page);
    }, [freelancerId, page]);

    const submitReview = async (rating, comment) => {
        await api.post("/reviews", {
            orderId,
            rating,
            comment
        });

        fetchReviews(1);
    };

    return (
        <Container className="mt-10">

            <h2 className="text-xl font-bold mb-4">
                Reviews ⭐ {avg.toFixed(1)}
            </h2>

            {orderId && (
                <ReviewForm onSubmit={submitReview} />
            )}

            <div className="space-y-3 mt-6">

                {reviews.length === 0 && (
                    <p className="text-sm text-gray-400">
                        No reviews yet
                    </p>
                )}

                {reviews.map(r => (
                    <ReviewCard key={r._id} review={r} />
                ))}

            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-6">

                <button
                    disabled={page <= 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-3 py-1 border rounded"
                >
                    Prev
                </button>

                <span className="text-sm text-gray-600">
                    {page} / {pages}
                </span>

                <button
                    disabled={page >= pages}
                    onClick={() => setPage(p => p + 1)}
                    className="px-3 py-1 border rounded"
                >
                    Next
                </button>

            </div>

        </Container>
    );
};

export default Reviews;
