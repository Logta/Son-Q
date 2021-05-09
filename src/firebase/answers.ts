import { firestore } from "@/plugins/firebase";
import { Auth, Answer, Question } from "@/models";

const getAnswer = async (user: Auth, projectId: string) => {
  const answers: Array<Answer> = [];

  let collection = firestore
    .collection("projects")
    .doc(projectId)
    .collection("answers")
    .where("user_id", "==", user.id);
  await collection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc: any) => {
      const answer: any = {
        id: doc.id,
        no: doc.data().no,
        url: doc.data().url,
        answer: doc.data().answer,
        correct: doc.data().correct,
        user_id: doc.data().user_id,
        user_name: doc.data().user_name,
      };
      answers.push(answer);
    });
  });

  return answers;
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
    answer: answer.guess_user_id,
    correct: answer.select_user_id,
    answer_user_id: user.id,
    user_name: user.name,
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
  await collection.doc(answer.ID).set({
    no: questionNo,
    url: answer.url,
    answer: answer.guess_user_id,
    correct: answer.select_user_id,
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
    return +proj.data().questionNum * proj.data().participants.length;
  } else {
    console.log("No such document!");
  }
};

// 参加者を取得
const getParticipants = async (projectId: string) => {
  const members: Array<Object> = [];
  const proj = await firestore.collection("projects").doc(projectId).get();

  if (proj.exists) {
    proj.data().participants.map((p: any) => {
      const member: Object = {
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
};
