import type { User } from "@son-q/types";
import React from "react";

/**
 * GlobalContext: アプリケーション全体のClient State
 */
type GlobalContextType = {
  user: User;
  signInCheck: () => Promise<void>;
  signInGoogle: () => Promise<void>;
  signInEmail: (data: { email: string; password: string }) => Promise<void>;
  signUpEmail: (data: { email: string; password: string }) => Promise<boolean>;
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
  signInCheck: async () => {
    // デフォルトの空実装
  },
  signInGoogle: async () => {
    // デフォルトの空実装
  },
  signInEmail: async () => {
    // デフォルトの空実装
  },
  signUpEmail: async () => false,
  signOut: async () => "",
  handleDarkModeOff: () => {
    // デフォルトの空実装
  },
  handleDarkModeOn: () => {
    // デフォルトの空実装
  },
  darkMode: true,
  loading: true,
  errorMessage: () => {
    // デフォルトの空実装
  },
  warningMessage: () => {
    // デフォルトの空実装
  },
  successMessage: () => {
    // デフォルトの空実装
  },
});
