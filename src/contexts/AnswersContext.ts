import React from "react";
import { Answer, Question, Participant } from "@/models";

type Props = {
  answers: Array<Answer>;
  getAnswers: Function;
  registerAnswers: Function;
  questionNum: number;
  participants: Array<Participant>;
  questions: Array<Question>;
  loading: boolean;
};

export const AnswersContext = React.createContext<Props>({
  answers: [],
  getAnswers: Function,
  registerAnswers: Function,
  questionNum: 0,
  participants: [],
  questions: [],
  loading: true,
});
