import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyGigs, deleteGig } from "../../services/gigService";

import Container from "../../components/ui/Container";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { useToast } from "../../context/ToastContext";

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const toast = useToast();

  const fetchGigs = async () => {
    try {
      const res = await getMyGigs();
      setGigs(res.data);
    } catch (err) {
      toast.error("Failed to load gigs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gig?")) return;

    try {
      await deleteGig(id);
      toast.success("Gig deleted successfully");
      setGigs((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      toast.error("Failed to delete gig");
    }
  };

  return (
    <Container>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Gigs</h1>

        <Link to="/create-gig">
          <Button>Create New Gig</Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : gigs.length === 0 ? (
        <EmptyState text="No gigs created yet 🚀" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <Card key={gig._id} className="p-4">

              <img
                src={gig.images?.[0] || "/placeholder.png"}
                alt={gig.title}
                className="object-cover rounded-lg"
              />

              <h2 className="font-semibold mt-3">
                {gig.title}
              </h2>

              <p className="text-sm text-gray-500 line-clamp-2">
                {gig.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-primary">
                  ${gig.price}
                </span>

                <div className="flex gap-2">

                  <Link to={`/edit-gig/${gig._id}`}>
                    <button className="px-3 py-1 text-sm border rounded hover:bg-slate-50">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(gig._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>
              </div>

            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default MyGigs;
