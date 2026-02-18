import { useEffect, useState } from "react";
import GigGrid from "./GigGrid";
import SkeletonGig from "../common/SkeletonGig";
import { getGigs } from "../../services/gigService";

const FeaturedGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGigs({ limit: 8 })
      .then(res => setGigs(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonGig key={i} />
        ))}
      </div>
    );
  }

  return <GigGrid gigs={gigs} />;
};

export default FeaturedGigs;
