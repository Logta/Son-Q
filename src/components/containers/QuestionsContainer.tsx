import { QuestionsContext } from "@/contexts";
import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Question } from "@/models";
import {
  awaitOnAuth,
  getQuestion,
  createQuestion,
  deleteQuestion,
  joinQuestion,
} from "@/firebase";

const QuestionsContainer: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Array<Question>>([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const user = await awaitOnAuth();

    setLoading(false);
    if (_.isNull(user) || !user.ok) {
      setQuestions([]);
      return;
    }
    const ps = await getQuestion(user);
    setQuestions(ps);
  };

  const createQuestions = async (data: Question) => {
    const user = await awaitOnAuth();
    if (_.isNull(user) || !user.ok) return;

    await createQuestion(user, data);
    await getQuestions();
  };

  const updateQuestions = async () => {
    setQuestions([]);
  };

  const deleteQuestions = async (id: string) => {
    const user = await awaitOnAuth();
    if (_.isNull(user) || !user.ok) return;

    await deleteQuestion(id);
    await getQuestions();
  };

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        getQuestions,
        createQuestions,
        updateQuestions,
        deleteQuestions,
        loading,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export { QuestionsContainer };
