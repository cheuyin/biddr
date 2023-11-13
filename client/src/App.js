import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignInForm from "./components/SignInForm.js";
import SignUpForm from "./components/SignUpForm.js";

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignInForm />} />
                    <Route path="/signin" element={<SignInForm />} />
                    <Route path="/signup" element={<SignUpForm />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
