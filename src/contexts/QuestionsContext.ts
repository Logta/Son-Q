import React from "react";
import { Question, Participant } from "@/models";

type Props = {
  questions: Array<Question>;
  participants: Array<Participant>;
  questionNum: number;
  getQuestions: Function;
  getQuestionsNum: Function;
  registerQuestions: Function;
  isUserJoinProject: boolean;
  loading: boolean;
};

export const QuestionsContext = React.createContext<Props>({
  questions: [],
  participants: [],
  isUserJoinProject: false,
  questionNum: 0,
  getQuestions: Function,
  getQuestionsNum: Function,
  registerQuestions: Function,
  loading: true,
});
