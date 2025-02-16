import { useContext, createContext } from "react";

export type PasswordContextType = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordToggle: boolean;
  setPasswordToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordContext = createContext<PasswordContextType | null>(null);

export const usePasswordContext = () => {
  const context = useContext(PasswordContext);
  if (!context) {
    throw new Error("usePasswordContext must be used within a PasswordContextProvider");
  }
  return context;
};

export const PasswordProvider = PasswordContext.Provider;
