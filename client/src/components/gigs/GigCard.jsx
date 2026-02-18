import { Link } from "react-router-dom";

import Card from "../ui/Card";
import Avatar from "../ui/Avatar";
import StarRating from "../common/StarRating";

const GigCard = ({ gig }) => {
    const image = gig.images?.[0] || "/placeholder.png";
    const BASE_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";
    const sellerAvatar = gig.freelancer?.avatar
        ? BASE_URL + gig.freelancer.avatar
        : "/avatar.png";


    return (
        <Link to={`/gig/${gig._id}`}>

            <Card className="p-3 transform hover:-translate-y-1">

                <img
                    src={image}
                    alt={gig.title}
                    className="h-50 w-full object-cover rounded-lg"
                />

                <h2 className="font-semibold mt-3 text-slate-800">
                    {gig.title}
                </h2>

                <p className="text-gray-500 text-sm line-clamp-2">
                    {gig.description}
                </p>

                <div className="mt-3 flex items-center flex-col gap-2">

                    {/* seller */}
                    <div className="flex items-center gap-3">
                        <Avatar src={sellerAvatar} size={32} />

                        <div className="text-sm">
                            <p className="text-slate-700">
                                {gig.freelancer?.name || "Seller"}
                            </p>

                            <StarRating
                                rating={gig.rating}
                                count={gig.reviewsCount}
                                size={14}
                            />

                        </div>
                    </div>

                    {/* price */}
                    <div className="text-primary font-bold text-lg">
                        ${gig.price}
                    </div>

                </div>

            </Card>

        </Link>
    );
};

export default GigCard;
