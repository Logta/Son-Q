import React from "react";
import { User } from "@/models";

type Props = {
  user: User;
  signInCheck: Function;
  signInGoogle: Function;
  signInEmail: Function;
  signUpEmail: Function;
  signOut: Function;
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
  loading: true,
});
