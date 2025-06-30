import { firestore } from "../plugins/firebase";
import type { Auth, Answer, Question, Participant } from "@son-q/types";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { isNil } from "es-toolkit";

const getAnswer = async (user: Auth, projectId: string) => {
  const answers: Array<Answer> = [];

  const docsRef = collection(firestore, "projects", projectId, "answers");

  await getDocs(query(docsRef, where("answer_user_id", "==", user.id))).then(
    (snapshot) => {
      snapshot.forEach((doc) => {
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
    }
  );

  return answers;
};

const getExistAnswerNum = async (projectId: string): Promise<number> => {
  const docsRef = collection(firestore, "projects", projectId, "answers");
  const proj = await getDocs(docsRef);
  return isNil(proj) ? 0 : +proj.size;
};

const createAnswer = async (
  user: Auth,
  answer: Answer,
  projectId: string,
  questionNo: number
) => {
  const docsRef = collection(firestore, "projects", projectId, "answers");
  try {
    await addDoc(docsRef, {
      no: questionNo,
      url: answer.url,
      guess_user_id: answer.guess_user_id,
      select_user_id: answer.select_user_id,
      answer_user_id: user.id,
      user_name: user.name,
      question_id: answer.question_id,
    });
    return { message: "作成が完了しました", variant: "success" };
  } catch {
    return { message: "作成に失敗しました", variant: "error" };
  }
};

const updateAnswer = async (
  answer: Answer,
  projectId: string,
  questionNo: number
) => {
  const washingtonRef = doc(
    firestore,
    "projects",
    projectId,
    "answers",
    answer.ID
  );
  const ans = {
    ...answer,
    no: questionNo,
    url: answer.url,
    guess_user_id: answer.guess_user_id,
    select_user_id: answer.select_user_id,
    question_id: answer.question_id,
  };
  await updateDoc(washingtonRef, ans);
};

const registerAnswer = async (
  user: Auth,
  answers: Array<Answer>,
  projectId: string
) => {
  try {
    answers.forEach(async (answer, index) => {
      if (answer && answer.ID !== "") {
        await updateAnswer(answer, projectId, index);
      } else {
        await createAnswer(user, answer, projectId, index);
      }
    });
    return { message: "回答が完了しました", variant: "success" };
  } catch {
    return {
      message:
        "回答の登録/更新に失敗しました\n時間をあけてから再度操作を実行してください",
      variant: "error",
    };
  }
};

// 問題数を取得
const getQuestionNumber = async (projectId: string) => {
  const docRef = doc(firestore, "projects", projectId);
  const proj = await getDoc(docRef);

  if (proj.exists()) {
    const data = proj.data();
    return data ? +data.question_num * +data.participants.length : 0;
  } else {
    return 0;
  }
};

// 参加者を取得
const getParticipants = async (projectId: string) => {
  const members: Array<Participant> = [];
  const docRef = doc(firestore, "projects", projectId);
  const proj = await getDoc(docRef);

  if (proj.exists()) {
    const data = proj.data();
    data?.participants.map((p: any) => {
      const member: Participant = {
        user_id: p.user_id,
        user_name: p.user_name,
      };
      members.push(member);
    });
  }
  return members;
};

// 全件取得する
const getAllQuestions = async (projectId: string) => {
  const questions: Array<Question> = [];

  const docsRef = collection(firestore, "projects", projectId, "questions");

  await getDocs(docsRef).then((snapshot) => {
    snapshot.forEach((doc) => {
      const question: Question = {
        ID: doc.id,
        no: doc.data().no,
        url: doc.data().url,
        select_user_id: doc.data().select_user_id,
      };
      questions.push(question);
    });
  });

  return questions;
};

export {
  getAnswer,
  createAnswer,
  updateAnswer,
  registerAnswer,
  getQuestionNumber,
  getParticipants,
  getAllQuestions,
  getExistAnswerNum,
};
