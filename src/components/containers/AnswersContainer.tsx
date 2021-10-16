import { AnswersContext, GlobalContext } from "@/contexts";
import React, { useState, useEffect, useContext, useMemo } from "react";
import _ from "lodash";

import { Answer, Question, Participant, Auth } from "@/models";
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
  const [user, setUser] = useState<Auth>();

  // メモ化関数
  const isUserJoinProject = useMemo(() => {
    return participants.some((p) => p.user_id == user.id);
  }, [questions, user]);

  // useEffect
  useEffect(() => {
    getAnswersInfo();
  }, []);

  // getter / setter
  const getAnswersInfo = async () => {
    await getQuestions();
    await getQuestionsNum();
    await getParticipant();
    await getAnswers();
    setUser(await awaitOnAuth());

    setLoading(false);
  };

  const getAnswers = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setAnswers([]);
      return;
    }
    const ps = await getAnswer(user, projectId);
    setAnswers(ps);
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
        isUserJoinProject,
        loading,
      }}
    >
      {children}
    </AnswersContext.Provider>
  );
};

export { AnswersContainer };
