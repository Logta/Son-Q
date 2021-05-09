import { AnswersContext } from "@/contexts";
import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Answer } from "@/models";
import { awaitOnAuth, getAnswer } from "@/firebase";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

const AnswersContainer: React.FC = ({ children, projectId }: Props) => {
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
    const ps = await getAnswer(user, projectId);
    setAnswers(ps);
  };

  return (
    <AnswersContext.Provider
      value={{
        answers,
        getAnswers,
        loading,
      }}
    >
      {children}
    </AnswersContext.Provider>
  );
};

export { AnswersContainer };
