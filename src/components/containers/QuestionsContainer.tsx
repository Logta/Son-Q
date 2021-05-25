import { QuestionsContext, GlobalContext } from "@/contexts";
import { useState, useEffect, useContext } from "react";
import _ from "lodash";

import { Question } from "@/models";
import {
  awaitOnAuth,
  getQuestion,
  registerQuestion,
  getQuestionNum,
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

  useEffect(() => {
    getQuestions();
    getQuestionsNum();
  }, []);

  const getQuestions = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setQuestions([]);
      return;
    }
    const ps = await getQuestion(user, projectId);
    setQuestions(ps);
  };

  const getQuestionsNum = async (): Promise<number> => {
    const user = await awaitOnAuth();

    setLoading(false);
    if (_.isNull(user) || !user.ok) {
      setQuestions([]);
      errorMessage("回答するにはサインインが必要です");
      return;
    }
    const questionNum = await getQuestionNum(projectId);
    setQuestionNum(questionNum);
    setLoading(false);
  };

  const registerQuestions = async (questions: Array<Question>) => {
    const user = await awaitOnAuth();
    if (_.isNull(user) || !user.ok) {
      errorMessage("問題設定するにはサインインが必要です");
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
