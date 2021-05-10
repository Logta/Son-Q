import { ResultsContext } from "@/contexts";
import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Answer, Result, Participant } from "@/models";
import {
  awaitOnAuth,
  getResult,
  getAllAnswers,
  getParticipants,
  getQuestionNumber,
  registerResult,
} from "@/firebase";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

const ResultsContainer: React.FC<Props> = ({ children, projectId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const [results, setResults] = useState<Array<Result>>([]);
  const [participants, setParticipants] = useState<Array<Participant>>([]);

  useEffect(() => {
    getResults();
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
    const ps = await getAllAnswers(projectId);
    setAnswers(ps);
    setLoading(false);
  };

  const getResults = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setResults([]);
      return;
    }
    const ps = await getResult(projectId);
    setResults(ps);
  };

  const getParticipant = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setParticipants([]);
      return;
    }
    const p = await getParticipants(projectId);
    setParticipants(p);
  };

  const getQuestionsNum = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setQuestionNum(0);
      return;
    }
    const qn = await getQuestionNumber(projectId);
    setQuestionNum(qn);
  };

  const registerResults = async (answers: Array<Result>) => {
    const user = await awaitOnAuth();
    if (_.isNull(user) || !user.ok) return;

    registerResult(user, answers, projectId);
    await getResults();
  };

  return (
    <ResultsContext.Provider
      value={{
        answers,
        getAnswers,
        registerResults,
        questionNum,
        results,
        participants,
        loading,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export { ResultsContainer };
