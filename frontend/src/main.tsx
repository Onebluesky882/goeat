import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import LogOut from "./pages/LogOut.tsx";
import { Toaster } from "sonner";
import UserProfile from "./pages/UserProfile.tsx";
import FeedbackForm from "./pages/FeedbackForm.tsx";
import Feature from "./feature/idea.tsx";

import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import { Shop } from "./route/Shop.tsx";
import Controller from "./pages/Controller.tsx";
import NotFound from "./pages/NotFound.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="dashboard" element={<Controller />} />
          <Route path="feedback" element={<FeedbackForm />} />
          <Route path="feature" element={<Feature />} />
          {Shop()}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
