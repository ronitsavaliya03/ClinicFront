import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function ProtectedRoute({ children, allowRoles = [] }) {
    const navigate = useNavigate();
    const { isAuthenticated, loading, user } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }
    
    // Yaad rakhvanu chhe sir ae navigate('/') karyu chhe
    if (!loading &&!isAuthenticated) {
        navigate("/login");
    }

    if(allowRoles.length > 0 && !allowRoles.includes(user?.role)) {
        navigate("/");
    }

    return children;
}

export default ProtectedRoute;