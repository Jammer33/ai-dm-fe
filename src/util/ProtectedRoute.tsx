import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }
    return children;
}
export default ProtectedRoute;