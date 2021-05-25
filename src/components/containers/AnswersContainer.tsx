import { AnswersContext, GlobalContext } from "@/contexts";
import React, { useState, useEffect, useContext } from "react";
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
  const { errorMessage, successMessage } = useContext(GlobalContext);

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
    _.isNil(p) &&
      errorMessage(
        "参加者情報の取得に失敗しました!\n時間をおいてから再度操作を行ってください。"
      );
    setParticipants(p);
  };

  const getQuestionsNum = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setAnswers([]);
      return;
    }
    const qn = await getQuestionNumber(projectId);
    qn === 0 &&
      errorMessage(
        "問題数情報の取得に失敗しました!\n時間をおいてから再度操作を行ってください。"
      );
    setQuestionNum(qn);
  };

  const registerAnswers = async (answers: Array<Answer>) => {
    const user = await awaitOnAuth();
    if (_.isNull(user) || !user.ok) {
      errorMessage("回答するにはサインインが必要です");
      return false;
    }
    const { message, variant } = await registerAnswer(user, answers, projectId);
    switch (variant) {
      case "success":
        successMessage(message);
        break;

      case "error":
        errorMessage(message);
        return false;
    }
    await getAnswers();
    return true;
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
