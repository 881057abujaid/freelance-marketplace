import { useState } from "react";
import StarRating from "../common/StarRating";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const submit = () => {
        if (!comment.trim()) return;

        onSubmit(rating, comment);

        setComment("");
        setRating(5);
    };

    return (
        <div className="bg-slate-50 p-4 rounded-xl space-y-3">

            <h3 className="font-semibold text-sm">
                Leave a review
            </h3>

            <StarRating rating={rating} setRating={setRating} />

            <Textarea
                placeholder="Write your feedback..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <Button onClick={submit}>
                Submit Review
            </Button>

        </div>
    );
};

export default ReviewForm;
