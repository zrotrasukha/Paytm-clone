import { useContext, createContext } from "react";

export type AppContextType = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordToggle: boolean;
  setPasswordToggle: React.Dispatch<React.SetStateAction<boolean>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      "usePasswordContext must be used within a PasswordContextProvider",
    );
  }
  return context;
};

export const ContextProvider = AppContext.Provider;
