import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInForm from "./components/SignInForm.js";
import SignUpForm from "./components/SignUpForm.js";
import HomePage from "./pages/HomePage.js";
import AuthPage from "./pages/AuthPage.js";
import PageNotFound from "./pages/PageNotFound.js";

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth" element={<AuthPage />}>
                        <Route path="" element={<Navigate to="signin" />} />
                        <Route path="signin" element={<SignInForm />} />
                        <Route path="signup" element={<SignUpForm />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
