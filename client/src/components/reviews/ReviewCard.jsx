import StarRating from "../common/StarRating";

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <img
                        src={review.reviewer?.avatar || "/avatar.png"}
                        className="w-9 h-9 rounded-full object-cover"
                    />

                    <div>
                        <div className="text-sm font-semibold text-slate-800">
                            {review.reviewer?.name}
                        </div>

                        <div className="text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                    </div>

                </div>

                <StarRating rating={review.rating} />
            </div>

            <p className="mt-3 text-sm text-gray-600">
                {review.comment}
            </p>
        </div>
    );
};

export default ReviewCard;
