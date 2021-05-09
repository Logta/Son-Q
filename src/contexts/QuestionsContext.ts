import React from "react";
import { Question } from "@/models";

type Props = {
  questions: Array<Question>;
  questionNum: number;
  getQuestions: Function;
  getQuestionsNum: Function;
  registerQuestions: Function;
  loading: boolean;
};

export const QuestionsContext = React.createContext<Props>({
  questions: [],
  questionNum: 0,
  getQuestions: Function,
  getQuestionsNum: Function,
  registerQuestions: Function,
  loading: true,
});
