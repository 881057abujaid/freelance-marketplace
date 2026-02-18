import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/users/login", data);
      login(res.data.token);
      toast.success("Login successful 🎉");
      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed"
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
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage orders, messages and your profile.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            No account?{" "}
            <Link to="/register" className="text-primary">
              Create one
            </Link>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 space-y-4"
        >
          <h3 className="text-lg font-semibold">
            Sign in to your account
          </h3>

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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span className="text-gray-600">
                Remember me
              </span>
            </label>
            <Link to="/" className="text-primary">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
