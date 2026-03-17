import { createContext, useEffect, useState, useContext } from "react";
import { getToken, getUserData } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (token) {
            // const userData = getUserData();
            // setUser(JSON.parse(userData));

            const userData = getUserData();
            setUser(userData);
        }
        setLoading(false);
    }, []);

    const loginAuth = (userData) => {
        setUser(JSON.parse(userData));
    }

    const logoutAuth = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{ 
                user,
                loginAuth,
                logoutAuth, 
                loading, 
                isAuthenticated: user !== null, 
                isAdmin: user?.role === "admin", 
                isReceptionist: user?.role === "receptionist", 
                isDoctor: user?.role === "doctor", 
                isPatient: user?.role === "patient"
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};