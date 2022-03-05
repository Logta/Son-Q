import { firestore } from "@/plugins/firebase";
import { Auth, Question } from "@/models";
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
import _ from "lodash";

const getQuestionNum = async (projectId: string): Promise<number> => {
  const docRef = doc(firestore, "projects", projectId);
  const proj = await getDoc(docRef);
  if (!proj.exists) {
    return null;
  }
  return _.isNil(proj) || _.isNil(proj.data()) ? 0 : +proj.data().question_num;
};

const getExistQuestionNum = async (projectId: string): Promise<number> => {
  const docRef = collection(firestore, "projects", projectId, "questions");
  const proj = await getDocs(docRef);
  return _.isNil(proj) ? 0 : +proj.size;
};

const getQuestion = async (user: Auth, projectId: string) => {
  const questions: Array<Question> = [];

  const docsRef = collection(firestore, "projects", projectId, "questions");

  getDocs(query(docsRef, where("select_user_id", "==", user.id))).then(
    (snapshot) => {
      snapshot.forEach((doc) => {
        questions.push({
          ID: doc.id,
          no: doc.data().no,
          url: doc.data().url,
          select_user_id: doc.data().select_user_id,
        });
      });
    }
  );
  return questions;
};

const createQuestion = async (
  user: Auth,
  question: Question,
  projectId: string
) => {
  try {
    await addDoc(collection(firestore, "projects", projectId, "questions"), {
      no: 0,
      url: question.url,
      select_user_id: user.id,
    });
    return { message: "作成が完了しました", variant: "success" };
  } catch {
    return { message: "作成に失敗しました", variant: "error" };
  }
};

const updateQuestion = async (
  user: Auth,
  question: Question,
  projectId: string
) => {
  const washingtonRef = doc(
    firestore,
    "projects",
    projectId,
    "questions",
    question.ID
  );
  await updateDoc(washingtonRef, {
    no: 0,
    url: question.url,
    select_user_id: user.id,
  });
};

const registerQuestion = async (
  user: Auth,
  questions: Array<Question>,
  projectId: string
) => {
  try {
    for (const question of questions) {
      if (_.isNil(question)) continue;

      if (question.ID !== "") {
        await updateQuestion(user, question, projectId);
      } else {
        await createQuestion(user, question, projectId);
      }
    }
    return { message: "問題設定が完了しました", variant: "success" };
  } catch {
    return {
      message:
        "問題設定の登録/更新に失敗しました\n時間をあけてから再度操作を実行してください",
      variant: "error",
    };
  }
};

export { getQuestion, registerQuestion, getQuestionNum, getExistQuestionNum };
