// Source: https://www.youtube.com/watch?v=oUZjO00NkhY&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=4 (10:13)

import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// This component wraps protected routes to ensure only authenticated users can access those routes

const RequireAuth = () => {
    const { auth } = useAuth();

    return auth?.accessToken ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default RequireAuth;
    