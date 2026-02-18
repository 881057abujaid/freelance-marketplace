import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate(`/gigs?search=${q}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-white to-accent/10 py-24 overflow-hidden">

      {/* Decorative blur circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        <div className="inline-block px-4 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Trusted by 10,000+ businesses
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">
          Find the perfect <span className="text-primary">freelancer</span>  
          <br /> for your business
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Hire top-rated professionals for design, development, marketing, writing and more.
        </p>

        <form
          onSubmit={submit}
          className="mt-8 max-w-xl mx-auto flex shadow-lg rounded-xl overflow-hidden"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services..."
            className="flex-1 px-4 py-4 outline-none"
          />
          <button className="bg-primary px-6 text-white font-medium hover:bg-primary-dark transition">
            Search
          </button>
        </form>

        <div className="mt-6 flex justify-center gap-6 text-sm text-gray-500">
          <span>⭐ 4.8 Avg Rating</span>
          <span>⚡ Fast Delivery</span>
          <span>🔒 Secure Payments</span>
        </div>

      </div>
    </section>
  );
};

export default Hero;
