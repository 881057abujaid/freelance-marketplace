import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("token");

        if (stored) {
            setToken(stored);

            try {
                const decoded = JSON.parse(atob(stored.split(".")[1]));
                setUser(decoded);
            } catch (err) {
                console.error("Invalid token");
                localStorage.removeItem("token");
            }
        }

        setLoading(false);
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);

        const decoded = JSON.parse(atob(newToken.split(".")[1]));
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
