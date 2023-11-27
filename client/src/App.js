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
import BiddrLayout from "./components/BiddrLayout";
import CommunitiesPage from "./pages/CommunitiesPage.js";
import WalletsPage from "./pages/WalletsPage.js";
import MessagesPage from "./pages/MessagesPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import PostPage from "./pages/PostPage.js";
<<<<<<< HEAD
<<<<<<< HEAD
import CommunityPage from "./pages/CommunityPage.tsx";
=======
>>>>>>> 6b04642 (Added route for editProfile page)
=======
>>>>>>> c6cfaa49b9ec75bcb46f69dad278477af3ab324b
import EditProfilePage from "./pages/EditProfilePage.js"
import EditPassword from "./pages/EditPassword.js";

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
              <Route
                path="/"
                element={
                  <BiddrLayout>
                    <HomePage />
                  </BiddrLayout>
                }
              />
              <Route
                path="/communities"
                element={
                  <BiddrLayout>
                    <CommunitiesPage />
                  </BiddrLayout>
                }
              />
              <Route
                path="/wallets"
                element={
                  <BiddrLayout>
                    <WalletsPage />
                  </BiddrLayout>
                }
              />
              <Route
                path="/messages"
                element={
                  <BiddrLayout>
                    <MessagesPage />
                  </BiddrLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <BiddrLayout>
                    <ProfilePage />
                  </BiddrLayout>
                }
              />
              <Route
                path="/community/:name"
                element={
                  <BiddrLayout>
                    <CommunityPage />
                  </BiddrLayout>
                }
              />
              <Route
                path="/auction/:id"
                element={
                  <BiddrLayout>
                    <PostPage type={"auction"} />
                  </BiddrLayout>
                }
              />
              <Route
                path="/fundraiser/:id"
                element={
                  <BiddrLayout>
                    <PostPage type={"fundraiser"} />
                  </BiddrLayout>
                }
              />
              <Route path="/profile" element={<BiddrLayout><ProfilePage /></BiddrLayout>} />
              <Route path="/profile/edit" element={<BiddrLayout><EditProfilePage /></BiddrLayout>}/>
              <Route path="/profile/edit/password" element={<BiddrLayout><EditPassword /></BiddrLayout>}/>
              <Route path="/private" element={<TestPrivatePage />} />
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
