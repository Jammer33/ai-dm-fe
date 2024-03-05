import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useEffect } from "react";
import { isA } from "@jest/expect-utils";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        }
    }, [isAuthenticated]);

    return isAuthenticated != null ? children : null;
}
export default ProtectedRoute;