import { AnswersContext } from "@/contexts";
import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Answer } from "@/models";
import {
  awaitOnAuth,
  getAnswer,
  createAnswer,
  deleteAnswer,
  joinAnswer,
} from "@/firebase";

const AnswersContainer: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [answers, setAnswers] = useState<Array<Answer>>([]);

  useEffect(() => {
    getAnswers();
  }, []);

  const getAnswers = async () => {
    const user = await awaitOnAuth();

    setLoading(false);
    if (_.isNull(user) || !user.ok) {
      setAnswers([]);
      return;
    }
    const ps = await getAnswer(user);
    setAnswers(ps);
  };

  const createAnswers = async (data: Answer) => {
    const user = await awaitOnAuth();
    if (_.isNull(user) || !user.ok) return;

    await createAnswer(user, data);
    await getAnswers();
  };

  const updateAnswers = async () => {
    setAnswers([]);
  };

  const deleteAnswers = async (id: string) => {
    const user = await awaitOnAuth();
    if (_.isNull(user) || !user.ok) return;

    await deleteAnswer(id);
    await getAnswers();
  };

  ///プロジェクトに参加する
  const joinAnswers = async (id: string) => {
    const user = await awaitOnAuth();
    if (_.isNull(user) || !user.ok) return;

    await joinAnswer(user, id);
    await getAnswers();
  };

  return (
    <AnswersContext.Provider
      value={{
        answers,
        getAnswers,
        createAnswers,
        updateAnswers,
        deleteAnswers,
        joinAnswers,
        loading,
      }}
    >
      {children}
    </AnswersContext.Provider>
  );
};

export { AnswersContainer };
