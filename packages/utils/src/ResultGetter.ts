import type { Participant, Question, Answer } from "@son-q/types";
import { isNil } from "es-toolkit";

const getQuestioner = (
  participants: Array<Participant>,
  ques: Question
): string => {
  const participant = participants.find((p) => p.user_id === ques.select_user_id);
  return participant?.user_name || "";
};

const getRespondent = (
  ansUser: Participant,
  participants: Array<Participant>,

  ques: Question,
  answers: Array<Answer>
): string => {
  const ans = answers.find(
    (a) =>
      a.answer_user_id === ansUser.user_id &&
      ques.url === a.url &&
      ques.select_user_id === a.select_user_id
  );
  if (isNil(ans)) return "";
  const participant = participants.find((p) => p.user_id === ans.guess_user_id);
  return participant?.user_name || "";
};

// 今回使用するAPI
export { getQuestioner, getRespondent };
