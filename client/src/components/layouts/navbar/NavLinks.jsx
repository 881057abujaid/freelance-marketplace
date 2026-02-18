import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const NavLinks = ({ onClick }) => {
    const { user } = useAuth();

    return (
        <>
            <Link to="/gigs" onClick={onClick} className="hover:text-primary transition">
                Gigs
            </Link>

            {/* Only Freelancer can see this */}
            {user?.role === "freelancer" && (
                <Link to="/my-gigs" onClick={onClick} className="hover:text-primary transition">
                    My Gigs
                </Link>
            )}

            <Link to="/orders" onClick={onClick} className="hover:text-primary transition">
                Orders
            </Link>

            <Link to="/dashboard" onClick={onClick} className="hover:text-primary transition">
                Dashboard
            </Link>

            <Link to="/profile" onClick={onClick} className="hover:text-primary transition">
                Profile
            </Link>
        </>
    );
};

export default NavLinks;
