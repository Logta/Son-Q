import React from "react";
import { User } from "@/models";

type Props = {
  user: User;
  signIn: Function;
  signOut: Function;
  loading: boolean;
};

export const UserContext = React.createContext<Props>({
  user: {
    ID: "",
    Name: "",
    Login: false,
  },
  signIn: Function,
  signOut: Function,
  loading: true,
});
