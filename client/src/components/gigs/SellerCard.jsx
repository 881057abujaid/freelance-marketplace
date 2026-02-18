const SellerCard = ({ seller, gig }) => {
    const BASE_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";
    const sellerAvatar = gig.freelancer?.avatar
        ? BASE_URL + gig.freelancer.avatar
        : "/avatar.png";
    if (!seller) return null;

    return (
        <div className="border-t pt-4 flex items-center gap-3">

            <img
                src={sellerAvatar || "/avatar.png"}
                className="w-12 h-12 rounded-full object-cover"
            />

            <div>
                <p className="font-medium">{seller.name}</p>
                <p className="text-sm text-gray-500">Top rated seller</p>
            </div>
        </div>
    );
};

export default SellerCard;
