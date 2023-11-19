import axios from "./axios";

export const signIn = async (email, password) => {
    try {
        const response = await axios.post(
            "/auth/signin",
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};
