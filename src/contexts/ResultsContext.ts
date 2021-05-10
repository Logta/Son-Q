import React from "react";
import { Answer, Result, Participant, Question } from "@/models";

type Props = {
  results: Array<Result>;
  getAnswers: Function;
  registerResults: Function;
  questionNum: number;
  participants: Array<Participant>;
  questions: Array<Question>;
  answers: Array<Answer>;
  loading: boolean;
};

export const ResultsContext = React.createContext<Props>({
  results: [],
  getAnswers: Function,
  registerResults: Function,
  questionNum: 0,
  participants: [],
  answers: [],
  questions: [],
  loading: true,
});
