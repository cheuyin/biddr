// Source: https://www.youtube.com/watch?v=27KeYk-5vJw&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=5 (7:04)

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import FullScreenSpinner from "./FullScreenSpinner";

/*
This component wraps around routes where you want the user session to persist (basically all the routes).
This is how it works:
- Page is loaded, and this component is mounted.
- Checks if a token is stored in a user's cookies.
- If a token exists, check if that token is valid. If so, allow access to that page.
- Otherwise, proceed to logout. 
*/

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [auth?.accessToken, refresh]);

    return <>{isLoading ? <FullScreenSpinner /> : <Outlet />}</>;
};

export default PersistLogin;
