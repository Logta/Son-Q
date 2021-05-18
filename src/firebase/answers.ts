import { firestore } from "@/plugins/firebase";
import { Auth, Answer, Question, Participant } from "@/models";
import _ from "lodash";

const getAnswer = async (user: Auth, projectId: string) => {
  const answers: Array<Answer> = [];

  const ans = await firestore
    .collection("projects")
    .doc(projectId)
    .collection("answers")
    .where("answer_user_id", "==", user.id)
    .get();
  ans.forEach((doc: any) => {
    const answer: Answer = {
      ID: doc.id,
      no: doc.data().no,
      url: doc.data().url,
      guess_user_id: doc.data().guess_user_id,
      select_user_id: doc.data().select_user_id,
      answer_user_id: doc.data().answer_user_id,
      question_id: doc.data().question_id,
    };
    answers.push(answer);
  });

  return answers;
};

const getExistAnswerNum = async (projectId: string): Promise<number> => {
  const proj = await firestore
    .collection("projects")
    .doc(projectId)
    .collection("answers")
    .get();
  return _.isNil(proj) ? 0 : +proj.size;
};

const createAnswer = async (
  user: Auth,
  answer: Answer,
  projectId: string,
  questionNo: number
) => {
  const collection = firestore
    .collection("projects")
    .doc(projectId)
    .collection("answers");
  await collection.add({
    no: questionNo,
    url: answer.url,
    guess_user_id: answer.guess_user_id,
    select_user_id: answer.select_user_id,
    answer_user_id: user.id,
    user_name: user.name,
    question_id: answer.question_id,
  });
};

const updateAnswer = async (
  answer: Answer,
  projectId: string,
  questionNo: number
) => {
  const collection = firestore
    .collection("projects")
    .doc(projectId)
    .collection("answers");
  await collection.doc(answer.ID).update({
    no: questionNo,
    url: answer.url,
    guess_user_id: answer.guess_user_id,
    select_user_id: answer.select_user_id,
    question_id: answer.question_id,
  });
};

const registerAnswer = (
  user: Auth,
  answers: Array<Answer>,
  projectId: string
) => {
  answers.forEach((answer, index) => {
    if (answer && answer.ID !== "") {
      updateAnswer(answer, projectId, index);
    } else {
      createAnswer(user, answer, projectId, index);
    }
  });
};

// 問題数を取得
const getQuestionNumber = async (projectId: string) => {
  const proj = await firestore.collection("projects").doc(projectId).get();

  if (proj.exists) {
    return +proj.data().question_num * +proj.data().participants.length;
  } else {
    console.log("No such document!");
    return 0;
  }
};

// 参加者を取得
const getParticipants = async (projectId: string) => {
  const members: Array<Participant> = [];
  const proj = await firestore.collection("projects").doc(projectId).get();

  if (proj.exists) {
    proj.data().participants.map((p: any) => {
      const member: Participant = {
        user_id: p.user_id,
        user_name: p.user_name,
      };
      members.push(member);
    });
  } else {
    console.log("No such document!");
  }
  return members;
};

// 全件取得する
const getAllQuestions = async (projectId: string) => {
  const questions: Array<Question> = [];
  const ques = await firestore
    .collection("projects")
    .doc(projectId)
    .collection("questions")
    .get();

  ques.forEach((doc) => {
    const question: Question = {
      ID: doc.id,
      no: doc.data().no,
      url: doc.data().url,
      select_user_id: doc.data().select_user_id,
    };
    questions.push(question);
  });

  return questions;
};

export {
  getAnswer,
  registerAnswer,
  getQuestionNumber,
  getParticipants,
  getAllQuestions,
  getExistAnswerNum,
};
