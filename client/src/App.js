import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInForm from "./components/SignInForm.js";
import SignUpForm from "./components/SignUpForm.js";
import HomePage from "./pages/HomePage.js";
import AuthPage from "./pages/AuthPage.js";

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth" element={<AuthPage />}>
                        <Route path="" element={<SignInForm />} />
                        <Route path="signin" element={<SignInForm />} />
                        <Route path="signup" element={<SignUpForm />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
