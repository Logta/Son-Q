import type { Answer, Auth, Participant } from "@son-q/types";
import { isNil } from "es-toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../plugins/firebase";

const getAnswer = async (user: Auth, projectId: string) => {
  const answers: Array<Answer> = [];

  const docsRef = collection(firestore, "projects", projectId, "answers");

  await getDocs(query(docsRef, where("answer_user_id", "==", user.id))).then((snapshot) => {
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
  });

  return answers;
};

const getExistAnswerNum = async (projectId: string): Promise<number> => {
  const docsRef = collection(firestore, "projects", projectId, "answers");
  const proj = await getDocs(docsRef);
  return isNil(proj) ? 0 : +proj.size;
};

const createAnswer = async (user: Auth, answer: Answer, projectId: string, questionNo: number) => {
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

const updateAnswer = async (answer: Answer, projectId: string, questionNo: number) => {
  const docRef = doc(firestore, "projects", projectId, "answers", answer.ID);

  // ドキュメントの存在確認
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error(`Document with ID ${answer.ID} does not exist`);
  }

  const ans = {
    ...answer,
    no: questionNo,
    url: answer.url,
    guess_user_id: answer.guess_user_id,
    select_user_id: answer.select_user_id,
    question_id: answer.question_id,
  };
  await updateDoc(docRef, ans);
};

const registerAnswer = async (user: Auth, answers: Array<Answer>, projectId: string) => {
  try {
    // Promise.allを使用して非同期処理を適切に待機
    await Promise.all(
      answers.map(async (answer, index) => {
        if (answer && answer.ID !== "") {
          await updateAnswer(answer, projectId, index);
        } else {
          await createAnswer(user, answer, projectId, index);
        }
      })
    );
    return { message: "回答が完了しました", variant: "success" };
  } catch (error) {
    console.error("Answer registration failed:", error);
    return {
      message: "回答の登録/更新に失敗しました\n時間をあけてから再度操作を実行してください",
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
    data?.participants.map((p: { user_id: string; user_name: string }) => {
      const member: Participant = {
        user_id: p.user_id,
        user_name: p.user_name,
      };
      members.push(member);
    });
  }
  return members;
};

export {
  getAnswer,
  createAnswer,
  updateAnswer,
  registerAnswer,
  getQuestionNumber,
  getParticipants,
  getExistAnswerNum,
};
