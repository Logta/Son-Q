import React from "react";
import type { User } from "@son-q/types";

/**
 * GlobalContext: アプリケーション全体のClient State
 */
type GlobalContextType = {
  user: User;
  signInCheck: () => Promise<void>;
  signInGoogle: () => Promise<void>;
  signInEmail: (data: any) => Promise<void>;
  signUpEmail: (data: any) => Promise<boolean>;
  signOut: () => Promise<string>;
  handleDarkModeOff: () => void;
  handleDarkModeOn: () => void;
  darkMode: boolean;
  loading: boolean;
  errorMessage: (message: string) => void;
  warningMessage: (message: string) => void;
  successMessage: (message: string) => void;
};

export const GlobalContext = React.createContext<GlobalContextType>({
  user: {
    ID: "",
    Name: "",
    Login: false,
  },
  signInCheck: async () => {},
  signInGoogle: async () => {},
  signInEmail: async () => {},
  signUpEmail: async () => false,
  signOut: async () => "",
  handleDarkModeOff: () => {},
  handleDarkModeOn: () => {},
  darkMode: true,
  loading: true,
  errorMessage: () => {},
  warningMessage: () => {},
  successMessage: () => {},
});
