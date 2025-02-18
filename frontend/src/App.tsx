import { Toaster } from "react-hot-toast";
import { ContextProvider } from "./context/context";
import { BrowserRouter, Route, Routes } from "react-router";
import { SignupPage } from "./pages/signupPage";
import SigninPage from "./pages/signinPage";
import DashboardPage from "./pages/dashboardPage";
import Sendpage from "./pages/sendPage";
import HomePage from "./pages/homePage";
import { useState } from "react";

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordToggle, setPasswordToggle] = useState(true);

  return (
    <ContextProvider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        passwordToggle,
        setPasswordToggle,
      }}
    >
      <div className="font-bold uppercase px-2"></div>
      <Toaster
        toastOptions={{
          style: {
            fontWeight: "bold",
            minHeight: "100px",
            width: "300px",
            fontSize: "15px",
            margin: "10px",
            paddingInline: "22px",
          },
          position: "bottom-right",
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/send" element={<Sendpage />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}
