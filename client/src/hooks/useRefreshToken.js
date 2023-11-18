// Source: https://www.youtube.com/watch?v=nI8PYZNFtac&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=4 (15:00)

import useAuth from "./useAuth";
import { BASE_URL } from "../services/constants";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    // Hit /refresh route
    // Update access token to the response

    const response = async () => {
        const response = await fetch(BASE_URL + "/refresh", {
            credentials: "include",
        });
        console.log("REFRESH RESPONSE: ", response);
    };

    return response;
};

export default useRefreshToken;
