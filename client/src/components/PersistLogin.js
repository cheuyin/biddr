// Source: https://www.youtube.com/watch?v=27KeYk-5vJw&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=5 (7:04)

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

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

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`access token: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading, auth?.accessToken]);

    return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
