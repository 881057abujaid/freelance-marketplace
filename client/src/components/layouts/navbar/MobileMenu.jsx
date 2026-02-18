import NavLinks from "./NavLinks";
import { useNavigate } from "react-router-dom";

const MobileMenu = ({ open, user, logout, close }) => {
    const navigate = useNavigate();
    if (!open) return null;

    return (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-md p-4">
            <div className="flex flex-col gap-3">

                {user ? (
                    <>
                        <NavLinks onClick={close} />

                        <button
                            onClick={() => { logout(); close(); navigate("/"); }}
                            className="bg-primary text-white rounded py-1"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </>
                )}

            </div>
        </div>
    );
}
export default MobileMenu;