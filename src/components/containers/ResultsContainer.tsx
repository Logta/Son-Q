import { ResultsContext, GlobalContext } from "@/contexts";
import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";

import { Answer, Result, Participant, Question } from "@/models";
import {
  awaitOnAuth,
  getResult,
  getAllAnswers,
  getParticipants,
  getQuestionNumber,
  registerResult,
  getAllQuestions,
  getProjectMode as getPMode,
} from "@/firebase";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

const ResultsContainer: React.FC<Props> = ({ children, projectId }) => {
  const { errorMessage } = useContext(GlobalContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const [results, setResults] = useState<Array<Result>>([]);
  const [participants, setParticipants] = useState<Array<Participant>>([]);
  const [projectMode, setProjectMode] = useState<string>("normal");
  const [questions, setQuestions] = useState<Array<Question>>([]);
  useEffect(() => {
    getResults();
    getProjectMode();
    getQuestionsNum();
    getParticipant();
    getQuestions();
    getAnswers();
  }, []);

  const getProjectMode = async () => {
    const projectMode = await getPMode(projectId);
    setProjectMode(projectMode);
  };

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

  const getQuestions = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setQuestions([]);
      return;
    }
    const ps = await getAllQuestions(projectId);
    setQuestions(ps);
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
    _.isNil(p) &&
      errorMessage(
        "?????????????????????????????????????????????!\n???????????????????????????????????????????????????????????????"
      );
    setParticipants(p);
  };

  const getQuestionsNum = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setQuestionNum(0);
      return;
    }
    const qn = await getQuestionNumber(projectId);
    qn === 0 &&
      errorMessage(
        "?????????????????????????????????????????????!\n???????????????????????????????????????????????????????????????"
      );
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
        projectMode,
        results,
        questions,
        participants,
        loading,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export { ResultsContainer };
