import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: yup.string().required(),
});

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { role: "client" },
  });

  const role = watch("role");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/users/register", data);
      toast.success("Account created successfully 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center p-6">
      <div className="max-w-2xl mx-auto grid md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">

        {/* LEFT PANEL (unchanged) */}
        <div className="hidden md:flex flex-col justify-center p-8 bg-gradient-to-b from-primary/10 to-transparent">
          <h2 className="text-2xl font-bold text-slate-800">
            Create account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join as a client or freelancer to start collaborating.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Sign in
            </Link>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 space-y-4"
        >
          <h3 className="text-lg font-semibold">
            Register
          </h3>

          <label className="block text-sm text-gray-600">
            Full name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full border border-slate-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.name && (
            <p className="text-sm text-red-600">
              {errors.name.message}
            </p>
          )}

          <label className="block text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-slate-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-sm text-red-600">
              {errors.email.message}
            </p>
          )}

          <label className="block text-sm text-gray-600">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full border border-slate-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.password && (
            <p className="text-sm text-red-600">
              {errors.password.message}
            </p>
          )}

          <div>
            <div className="text-sm text-gray-600 mb-2">
              Account type
            </div>
            <div className="flex gap-2">
              <label
                className={`flex-1 p-3 rounded-md border ${
                  role === "client"
                    ? "border-primary bg-primary/5"
                    : "border-slate-200"
                }`}
              >
                <input
                  type="radio"
                  value="client"
                  {...register("role")}
                  className="mr-2"
                />
                Client
              </label>

              <label
                className={`flex-1 p-3 rounded-md border ${
                  role === "freelancer"
                    ? "border-primary bg-primary/5"
                    : "border-slate-200"
                }`}
              >
                <input
                  type="radio"
                  value="freelancer"
                  {...register("role")}
                  className="mr-2"
                />
                Freelancer
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
