import { AnswersContext } from "@/contexts";
import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Answer, Question, Participant } from "@/models";
import {
  awaitOnAuth,
  getAnswer,
  getAllQuestions,
  getParticipants,
  getQuestionNumber,
  registerAnswer,
} from "@/firebase";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

const AnswersContainer: React.FC<Props> = ({ children, projectId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [participants, setParticipants] = useState<Array<Participant>>([]);

  useEffect(() => {
    getQuestions();
    getQuestionsNum();
    getParticipant();
    getAnswers();
  }, []);

  const getAnswers = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setAnswers([]);
      return;
    }
    const ps = await getAnswer(user, projectId);
    setAnswers(ps);
    setLoading(false);
  };

  const getQuestions = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setQuestions([]);
      return;
    }
    const ps = await getAllQuestions(projectId);
    setQuestions(ps);
  };

  const getParticipant = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setQuestions([]);
      return;
    }
    const p = await getParticipants(projectId);
    setParticipants(p);
  };

  const getQuestionsNum = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setAnswers([]);
      return;
    }
    const qn = await getQuestionNumber(projectId);
    setQuestionNum(qn);
  };

  const registerAnswers = async (answers: Array<Answer>) => {
    const user = await awaitOnAuth();
    if (_.isNull(user) || !user.ok) return;

    registerAnswer(user, answers, projectId);
    await getAnswers();
  };

  return (
    <AnswersContext.Provider
      value={{
        answers,
        getAnswers,
        registerAnswers,
        questionNum,
        questions,
        participants,
        loading,
      }}
    >
      {children}
    </AnswersContext.Provider>
  );
};

export { AnswersContainer };
