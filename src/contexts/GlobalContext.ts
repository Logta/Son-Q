import React from "react";
import { User } from "@/models";

type Props = {
  user: User;
  signInCheck: Function;
  signInGoogle: Function;
  signInEmail: Function;
  signUpEmail: Function;
  signOut: Function;
  handleDarkModeOff: Function;
  handleDarkModeOn: Function;
  darkMode: boolean;
  loading: boolean;
};

export const GlobalContext = React.createContext<Props>({
  user: {
    ID: "",
    Name: "",
    Login: false,
  },
  signInCheck: Function,
  signInGoogle: Function,
  signInEmail: Function,
  signUpEmail: Function,
  signOut: Function,
  handleDarkModeOff: Function,
  handleDarkModeOn: Function,
  darkMode: true,
  loading: true,
});
