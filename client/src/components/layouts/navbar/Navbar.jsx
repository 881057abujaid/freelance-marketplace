import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../../../hooks/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b shadow-sm px-6 py-4 flex justify-between items-center">

            {/* Logo */}
            <Link to="/" className="font-bold text-lg">
                Freelance
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-6">

                {user ? (
                    <>
                        <NavLinks />
                        <button
                            onClick={() =>{
                                logout();
                                navigate("/");
                            }}
                            className="bg-primary text-white px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="border px-3 py-1 rounded">
                            Register
                        </Link>
                    </>
                )}

            </div>

            {/* Mobile button */}
            <button
                onClick={() => setOpen(!open)}
                className="md:hidden"
            >
                ☰
            </button>

            {/* Mobile menu */}
            <MobileMenu
                open={open}
                user={user}
                logout={logout}
                close={() => setOpen(false)}
            />
        </nav>
    );
};
export default Navbar;