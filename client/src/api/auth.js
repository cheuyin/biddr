import { BASE_URL } from "../services/constants.js";

export const signIn = async (email, password) => {
    try {
        const response = await fetch(BASE_URL + "/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.error) {
            throw new Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        throw error;
    }
};
