// Source: https://www.youtube.com/watch?v=nI8PYZNFtac&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=4 (15:00)

import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    // Ask for a new access token from the backend if the client's refresh token hasn't expired
    // Update access token to the response

    const response = async () => {
        try {
            const response = await axios.get("/refresh", {
                withCredentials: true,
            });

            setAuth((prev) => {
                return { ...prev, accessToken: response.data.accessToken };
            });
        } catch (error) {
            alert(error.message);
        }
    };

    return response;
};

export default useRefreshToken;
