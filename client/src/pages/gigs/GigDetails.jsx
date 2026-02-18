import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

import Reviews from "../../components/reviews/Reviews";
import SkeletonDetails from "../../components/common/SkeletonDetails";
import Packages from "../../components/gigs/Packages";

import GigGallery from "../../components/gigs/GigGallery";
import GigInfo from "../../components/gigs/GigInfo";
import SellerCard from "../../components/gigs/SellerCard";
import PriceCard from "../../components/gigs/PriceCard";

const GigDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [gig, setGig] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState("basic");

    useEffect(() => {
        api.get(`/gigs/${id}`).then(res => setGig(res.data));
    }, [id]);

    const handleBuy = async () => {
        await api.post("/orders", {
            gigId: id,
            package: selectedPackage,
        });

        navigate("/orders");
    };

    if (!gig) return <SkeletonDetails />;

    return (
        <div className="p-8 bg-slate-50">

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

                {/* LEFT */}
                <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6 space-y-4">

                    <GigGallery images={gig.images} />
                    <GigInfo gig={gig} />

                    <Packages
                        gig={gig}
                        selected={selectedPackage}
                        setSelected={setSelectedPackage}
                    />

                    <SellerCard seller={gig.freelancer} gig={gig} />

                </div>

                {/* RIGHT */}
                <PriceCard
                    gig={gig}
                    selectedPackage={selectedPackage}
                    onBuy={handleBuy}
                />

            </div>

            {/* Reviews */}
            <div className="max-w-6xl mx-auto mt-12">
                <Reviews freelancerId={gig.freelancer._id} />
            </div>

        </div>
    );
};

export default GigDetails;
