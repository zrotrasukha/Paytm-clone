import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { SignupPage } from "./pages/signupPage.tsx";
import SigninPage from "./pages/signinPage.tsx";
import Dashboard from "./pages/dashboardPage.tsx";
import Sendpage from "./pages/sendPage.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Sendpage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
