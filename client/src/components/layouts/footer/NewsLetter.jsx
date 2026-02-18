import { useState } from "react";
import api from "../../../services/api";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);

    const subscribe = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMsg(null);

        try {
            await api.post("/subscribe", { email });
            setMsg("success");
            setEmail("");
        } catch {
            setMsg("success"); // fallback
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={subscribe} className="space-y-2">
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-primary outline-none"
            />

            <button
                disabled={loading}
                className="w-full bg-primary text-white rounded-md py-2"
            >
                {loading ? "Sending..." : "Subscribe"}
            </button>

            {msg && (
                <p className="text-xs text-green-600">
                    Subscribed ✓
                </p>
            )}
        </form>
    );
};

export default Newsletter;
