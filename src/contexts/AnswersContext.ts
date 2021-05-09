import React from "react";
import { Answer } from "@/models";

type Props = {
  answers: Array<Answer>;
  getAnswers: Function;
  loading: boolean;
};

export const AnswersContext = React.createContext<Props>({
  answers: [],
  getAnswers: Function,
  loading: true,
});
