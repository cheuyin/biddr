import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInForm from "./components/SignInForm.js";
import SignUpForm from "./components/SignUpForm.js";
import HomePage from "./pages/HomePage.js";
import AuthPage from "./pages/AuthPage.js";
import PageNotFound from "./pages/PageNotFound.js";
import RequireAuth from "./components/RequireAuth.js";
import TestPrivatePage from "./pages/TestPrivatePage.js";
import PersistLogin from "./components/PersistLogin.js";

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    {/* Authentication pages */}
                    <Route path="/auth" element={<AuthPage />}>
                        <Route path="" element={<Navigate to="signin" />} />
                        <Route path="signin" element={<SignInForm />} />
                        <Route path="signup" element={<SignUpForm />} />
                    </Route>

                    {/* Protected routes  */}
                    <Route element={<PersistLogin />}>
                        <Route element={<RequireAuth />}>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/private"
                                element={<TestPrivatePage />}
                            />
                        </Route>
                    </Route>

                    {/* Catches all invalid routes. */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
