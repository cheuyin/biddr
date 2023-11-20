// Source: https://www.youtube.com/watch?v=nI8PYZNFtac&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=6 (23:01)

import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

// Create a private axios instance for authentication purposes
// Adds interceptors that automatically handle session-saving functionality
// For example, if a user's access token has expired, requests using this axios instance will
// automatically ask for a new access token in the background without the user being aware

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        // Send the access token with every request
        // If the access token has expired (every few mins) and the code to handle
        // this situation fails, then throw an error
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // If access token has expired, then request a new access token
        // If refresh token has also expired, then return an error
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        // Make sure to manually remove interceptors
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
