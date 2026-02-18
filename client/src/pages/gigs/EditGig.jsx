import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGigById, updateGig } from "../../services/gigService";

import Container from "../../components/ui/Container";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { useToast } from "../../context/ToastContext";

const EditGig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    deliveryTime: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadGig = async () => {
      try {
        const res = await getGigById(id);
        const gig = res.data;

        setForm({
          title: gig.title || "",
          description: gig.description || "",
          price: gig.price || "",
          category: gig.category || "",
          deliveryTime: gig.deliveryTime || "",
        });
      } catch {
        error("Failed to load gig");
        navigate("/my-gigs");
      } finally {
        setLoading(false);
      }
    };

    loadGig();
  }, [id, navigate, error]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (form.title.length < 10)
      return "Title must be at least 10 characters";

    if (!form.description.trim())
      return "Description is required";
    if (form.description.length < 20)
      return "Description must be at least 20 characters";

    if (!form.price) return "Price is required";
    if (Number(form.price) <= 0)
      return "Price must be greater than 0";

    if (!form.category) return "Select category";
    if (!form.deliveryTime) return "Select delivery time";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      error(validationError);
      return;
    }

    try {
      setSaving(true);

      await updateGig(id, {
        ...form,
        price: Number(form.price),
        deliveryTime: Number(form.deliveryTime),
      });

      success("Gig updated successfully 🚀");

      setTimeout(() => {
        navigate("/my-gigs");
      }, 800);

    } catch {
      error("Failed to update gig");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">
        Loading gig...
      </div>
    );

  return (
    <Container>
      <Card className="max-w-xl mx-auto p-6">

        <h1 className="text-xl font-bold mb-6">
          Edit Gig
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
          />

          <Textarea
            rows={4}
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
          />

          <Input
            type="number"
            placeholder="Price ($)"
            value={form.price}
            onChange={(e) =>
              handleChange("price", e.target.value)
            }
          />

          <Select
            value={form.category}
            onChange={(e) =>
              handleChange("category", e.target.value)
            }
          >
            <option value="">Select Category</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="seo">SEO</option>
            <option value="writing">Writing</option>
          </Select>

          <Select
            value={form.deliveryTime}
            onChange={(e) =>
              handleChange("deliveryTime", e.target.value)
            }
          >
            <option value="">Delivery Time</option>
            <option value="1">1 Day</option>
            <option value="3">3 Days</option>
            <option value="7">7 Days</option>
          </Select>

          <Button disabled={saving}>
            {saving ? "Updating..." : "Update Gig"}
          </Button>

        </form>

      </Card>
    </Container>
  );
};

export default EditGig;
