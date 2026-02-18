import { useEffect, useState } from "react";

import Container from "../../components/ui/Container";
import EmptyState from "../../components/ui/EmptyState";

import SearchBar from "../../components/search/SearchBar";
import GigGrid from "../../components/gigs/GigGrid";
import SkeletonGig from "../../components/common/SkeletonGig";
import FiltersSidebar from "../../components/common/FiltersSidebar";

import { getGigs } from "../../services/gigService";

const Gigs = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");
    const [delivery, setDelivery] = useState("");
    const [sellerLevel, setSellerLevel] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");

    const [showFilters, setShowFilters] = useState(false);

    const fetchGigs = async () => {
        setLoading(true);

        const res = await getGigs({
            search,
            category,
            delivery,
            sellerLevel,
            min,
            max,
        });

        setGigs(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchGigs();
    }, [search, category, delivery, sellerLevel, min, max]);

    const clearFilters = () => {
        setCategory("");
        setDelivery("");
        setSellerLevel("");
        setMin("");
        setMax("");
    };

    return (
        <Container>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Explore Services</h1>

                {/* mobile filter btn */}
                <button
                    className="md:hidden border px-3 py-2 rounded"
                    onClick={() => setShowFilters(true)}
                >
                    Filters
                </button>
            </div>

            <SearchBar
                value={search}
                setValue={setSearch}
                onSubmit={(e) => {
                    e.preventDefault();
                    fetchGigs();
                }}
            />

            <div className="md:flex gap-6 mt-6">

                {/* Desktop sidebar */}
                <div className="hidden md:block md:w-72">
                    <FiltersSidebar
                        category={category}
                        setCategory={setCategory}
                        delivery={delivery}
                        setDelivery={setDelivery}
                        sellerLevel={sellerLevel}
                        setSellerLevel={setSellerLevel}
                        min={min}
                        setMin={setMin}
                        max={max}
                        setMax={setMax}
                        onApply={fetchGigs}
                        onClear={clearFilters}
                    />
                </div>

                {/* Main content */}
                <div className="flex-1">

                    {loading ? (
                        <div className="grid grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <SkeletonGig key={i} />
                            ))}
                        </div>
                    ) : gigs.length === 0 ? (
                        <EmptyState text="No gigs found 😔" />
                    ) : (
                        <GigGrid gigs={gigs} />
                    )}

                </div>
            </div>

            {/* ⭐ MOBILE DRAWER */}
            {showFilters && (
                <div className="fixed inset-0 bg-black/40 z-50 p-4">

                    <div className="max-w-sm bg-white rounded-xl mx-auto">

                        <FiltersSidebar
                            category={category}
                            setCategory={setCategory}
                            delivery={delivery}
                            setDelivery={setDelivery}
                            sellerLevel={sellerLevel}
                            setSellerLevel={setSellerLevel}
                            min={min}
                            setMin={setMin}
                            max={max}
                            setMax={setMax}
                            onApply={() => {
                                fetchGigs();
                                setShowFilters(false);
                            }}
                            onClear={clearFilters}
                        />

                        <div className="text-right p-3">
                            <button onClick={() => setShowFilters(false)}>Close</button>
                        </div>

                    </div>

                </div>
            )}

        </Container>
    );
};

export default Gigs;
