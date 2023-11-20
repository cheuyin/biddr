// Source: https://www.youtube.com/watch?v=X3qyxo_UTR4&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=3 (15:00)

import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({});

// The global auth object has two fields: "email" and "accessToken"

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    // Decode the email stored in the access token and store it in the auth object
    useEffect(() => {
        if (auth.accessToken) {
            const email = jwtDecode(auth.accessToken).email;
            setAuth((prev) => {
                return { ...prev, email };
            });
        }
    }, [auth?.accessToken]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
