import React from "react";
import { Answer } from "@/models";

type Props = {
  answers: Array<Answer>;
  getAnswers: Function;
  createAnswers: Function;
  updateAnswers: Function;
  deleteAnswers: Function;
  joinAnswers: Function;
  loading: boolean;
};

export const AnswersContext = React.createContext<Props>({
  answers: [],
  getAnswers: Function,
  createAnswers: Function,
  updateAnswers: Function,
  deleteAnswers: Function,
  joinAnswers: Function,
  loading: true,
});
