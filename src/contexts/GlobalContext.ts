import React from "react";
import { User } from "@/models";

type Props = {
  user: User;
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
  signInGoogle: Function,
  signInEmail: Function,
  signUpEmail: Function,
  signOut: Function,
  loading: true,
});
