import { QuestionsContext, GlobalContext } from "@/contexts";
import { useState, useEffect, useContext, useMemo } from "react";
import _ from "lodash";

import { Question, Participant, Auth } from "@/models";
import {
  awaitOnAuth,
  getQuestion,
  registerQuestion,
  getQuestionNum,
  getParticipants,
} from "@/firebase";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

const QuestionsContainer: React.FC<Props> = ({ children, projectId }) => {
  const { errorMessage, successMessage } = useContext(GlobalContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [participants, setParticipants] = useState<Array<Participant>>([]);
  const [user, setUser] = useState<Auth>();

  // メモ化関数
  const isUserJoinProject = useMemo(() => {
    return participants.some((p) => p.user_id == user.id);
  }, [questions, user]);

  // useEffect
  useEffect(() => {
    getQuestionsInfo();
  }, []);

  // getter / setter
  const getQuestionsInfo = async () => {
    await getQuestions();
    await getQuestionsNum();
    await getParticipant();
    setUser(await awaitOnAuth());

    setLoading(false);
  };

  const getQuestions = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user)) {
      setQuestions([]);
      return;
    }
    const ps = await getQuestion(user, projectId);
    setQuestions(ps);
  };

  const getQuestionsNum = async (): Promise<number> => {
    const user = await awaitOnAuth();

    setLoading(false);
    if (_.isNull(user)) {
      setQuestions([]);
      errorMessage("回答するにはサインインが必要です");
      return;
    }
    const questionNum = await getQuestionNum(projectId);
    setQuestionNum(questionNum);
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

  const registerQuestions = async (questions: Array<Question>) => {
    const user = await awaitOnAuth();
    if (_.isNull(user)) {
      errorMessage("問題設定するにはサインインが必要です");
      return false;
    }
    if (participants.some((p) => p.user_id === user.id)) {
      errorMessage("問題設定するにはプロジェクトへの参加が必要です");
      return false;
    }

    const { message, variant } = await registerQuestion(
      user,
      questions,
      projectId
    );
    switch (variant) {
      case "success":
        successMessage(message);
        break;

      case "error":
        errorMessage(message);
        return false;
    }
    await getQuestions();
    return true;
  };

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        questionNum,
        participants,
        isUserJoinProject,
        getQuestions,
        getQuestionsNum,
        registerQuestions,
        loading,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export { QuestionsContainer };
