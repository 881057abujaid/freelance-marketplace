const PriceCard = ({ gig, selectedPackage, onBuy }) => {
    const base = Number(gig.price || 0);

    const price =
        selectedPackage === "premium"
            ? base * 2
            : selectedPackage === "standard"
                ? base * 1.5
                : base;

    return (
        <div className="bg-white rounded-xl shadow-md p-5 sticky top-24">

            <p className="text-sm text-gray-500">Starting at</p>

            <p className="text-3xl font-bold text-primary mb-4">
                ${Math.round(price)}
            </p>

            <button
                onClick={onBuy}
                className="w-full bg-primary text-white py-3 rounded-md"
            >
                Continue
            </button>

            <div className="text-sm text-gray-500 mt-4 space-y-1">
                <p>✔ 3 Days Delivery</p>
                <p>✔ 2 Revisions</p>
            </div>
        </div>
    );
};

export default PriceCard;
