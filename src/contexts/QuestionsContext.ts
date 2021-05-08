import React from "react";
import { Question } from "@/models";

type Props = {
  questions: Array<Question>;
  getQuestions: Function;
  createQuestions: Function;
  updateQuestions: Function;
  deleteQuestions: Function;
  loading: boolean;
};

export const QuestionsContext = React.createContext<Props>({
  questions: [],
  getQuestions: Function,
  createQuestions: Function,
  updateQuestions: Function,
  deleteQuestions: Function,
  loading: true,
});
