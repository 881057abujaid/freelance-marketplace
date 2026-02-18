import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../components/ui/Container";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import ImageUploader from "../../components/gigs/ImageUploader";

import { useToast } from "../../context/ToastContext";
import { createGig } from "../../services/gigService";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  delivery: "",
  images: [],
};

const CreateGig = () => {
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (form.title.length < 10) return "Title must be at least 10 characters";

    if (!form.description.trim()) return "Description is required";
    if (form.description.length < 20)
      return "Description must be at least 20 characters";

    if (!form.price) return "Price is required";
    if (Number(form.price) <= 0) return "Price must be greater than 0";

    if (!form.category) return "Select a category";
    if (!form.delivery) return "Select delivery time";

    if (form.images.length === 0)
      return "Upload at least one image";

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

      await createGig({
        ...form,
        price: Number(form.price),
        delivery: Number(form.delivery),
      });

      success("Gig created successfully 🎉");

      setForm(initialState);

      setTimeout(() => {
        navigate("/my-gigs");
      }, 800);

    } catch (err) {
      console.error(err);
      error("Failed to create gig");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container>
      <Card className="max-w-xl mx-auto p-6">

        <h1 className="text-xl font-bold mb-6">
          Create New Gig
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <Input
            placeholder="Gig title"
            value={form.title}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
          />

          {/* Description */}
          <Textarea
            rows={4}
            placeholder="Describe your service"
            value={form.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
          />

          {/* Price */}
          <Input
            type="number"
            placeholder="Price ($)"
            value={form.price}
            onChange={(e) =>
              handleChange("price", e.target.value)
            }
          />

          {/* Category */}
          <Select
            value={form.category}
            onChange={(e) =>
              handleChange("category", e.target.value)
            }
          >
            <option value="">Select category</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="writing">Writing</option>
            <option value="seo">SEO</option>
          </Select>

          {/* Delivery */}
          <Select
            value={form.delivery}
            onChange={(e) =>
              handleChange("delivery", e.target.value)
            }
          >
            <option value="">Delivery time</option>
            <option value="1">1 day (Express)</option>
            <option value="3">Up to 3 days</option>
            <option value="7">1 week+</option>
          </Select>

          {/* Images */}
          <ImageUploader
            images={form.images}
            setImages={(imgs) =>
              setForm((prev) => ({
                ...prev,
                images: imgs,
              }))
            }
          />

          <Button disabled={saving}>
            {saving ? "Creating..." : "Create Gig"}
          </Button>

        </form>

      </Card>
    </Container>
  );
};

export default CreateGig;
