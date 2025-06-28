import { Participant, Question, Answer } from "@/models";
import { isNil } from "es-toolkit";

const getQuestioner = (
  participants: Array<Participant>,
  ques: Question
): string => {
  return participants.find((p) => p.user_id === ques.select_user_id).user_name;
};

const getRespondent = (
  ansUser: Participant,
  participants: Array<Participant>,

  ques: Question,
  answers: Array<Answer>
): string => {
  const ans: Answer = answers.find(
    (a) =>
      a.answer_user_id === ansUser.user_id &&
      ques.url === a.url &&
      ques.select_user_id === a.select_user_id
  );
  if (isNil(ans)) return "";
  return participants.find((p) => p.user_id === ans.guess_user_id).user_name;
};

// 今回使用するAPI
export { getQuestioner, getRespondent };
