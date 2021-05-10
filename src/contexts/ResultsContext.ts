import React from "react";
import { Answer, Result, Participant } from "@/models";

type Props = {
  results: Array<Result>;
  getAnswers: Function;
  registerResults: Function;
  questionNum: number;
  participants: Array<Participant>;
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
  loading: true,
});
