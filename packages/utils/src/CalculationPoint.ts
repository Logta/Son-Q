import type { Answer } from "@son-q/types";

const getCorrectPoint = (userID: string, answers: Array<Answer>): number => {
  const userAnswers = answers.filter((ans) => ans.answer_user_id === userID);
  const correctAnswers = userAnswers.filter(
    (ans) => ans.guess_user_id === ans.select_user_id
  );
  return correctAnswers.length;
};

const getDuplicateDeletionArray = (array: string[]) => {
  return [...new Set(array)];
};

const getOnlyOneCorrectAnswer = (
  userID: string,
  answers: Array<Answer>,
  participantNum: number
): number => {
  const otherCorrectAnswers = answers.filter(
    (ans) =>
      ans.select_user_id === userID &&
      ans.answer_user_id !== userID &&
      ans.guess_user_id === ans.select_user_id
  );

  const userQuestionIDs = getDuplicateDeletionArray(
    answers
      .filter((ans) => ans.select_user_id === userID)
      .map((ans) => ans.question_id)
  );

  let point = 0;
  console.log(`userQuestionIDs lenght: ${userQuestionIDs.length}`);

  for (const id of userQuestionIDs) {
    const questionPoint = otherCorrectAnswers.filter(
      (ans) => ans.question_id === id
    ).length;
    questionPoint !== 0 && (point += participantNum - 1 - questionPoint);
    console.log(`questionPoint: ${questionPoint}`);
  }

  return point;
};

const getOnlyOneIncorrectAnswer = (
  userID: string,
  answers: Array<Answer>,
  participantNum: number
): number => {
  const otherCorrectAnswers = answers.filter(
    (ans) =>
      ans.select_user_id === userID &&
      ans.answer_user_id !== userID &&
      ans.guess_user_id === ans.select_user_id
  );

  const userQuestionIDs = getDuplicateDeletionArray(
    answers
      .filter((ans) => ans.select_user_id === userID)
      .map((ans) => ans.question_id)
  );

  let point = 0;
  for (const id of userQuestionIDs) {
    const questionPoint = otherCorrectAnswers.filter(
      (ans) => ans.question_id === id
    ).length;
    questionPoint !== participantNum - 1 && (point += questionPoint);
  }
  return point;
};

const getCorrectAnswer = (userID: string, answers: Array<Answer>): number => {
  const otherCorrectAnswers = answers.filter(
    (ans) =>
      ans.select_user_id === userID &&
      ans.answer_user_id !== userID &&
      ans.guess_user_id === ans.select_user_id
  );

  const userQuestionIDs = getDuplicateDeletionArray(
    answers
      .filter((ans) => ans.select_user_id === userID)
      .map((ans) => ans.question_id)
  );

  let point = 0;
  for (const id of userQuestionIDs) {
    point += otherCorrectAnswers.filter((ans) => ans.question_id === id).length;
  }
  return point;
};

const getPoint = (
  mode: string,
  userID: string,
  answers: Array<Answer>,
  participantNum: number
): string => {
  switch (mode) {
    case "normal":
      return getCorrectPoint(userID, answers).toString();
    case "getOnlyOneIncorrectAnswer":
      return (
        getOnlyOneIncorrectAnswer(userID, answers, participantNum) +
        getCorrectPoint(userID, answers)
      ).toString();
    case "getOnlyOneCorrectAnswer":
      return (
        getOnlyOneCorrectAnswer(userID, answers, participantNum) +
        getCorrectPoint(userID, answers)
      ).toString();
    case "getCorrectAnswer":
      return (
        getCorrectAnswer(userID, answers) + getCorrectPoint(userID, answers)
      ).toString();
    default:
      return "error";
  }
};

// 今回使用するAPI
export {
  getPoint,
  getCorrectPoint,
  getOnlyOneCorrectAnswer,
  getDuplicateDeletionArray,
  getOnlyOneIncorrectAnswer,
};
