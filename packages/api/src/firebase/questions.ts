import { firestore } from "../plugins/firebase";
import type { Auth, Question } from "@son-q/types";
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

const getQuestionNum = async (projectId: string): Promise<number> => {
  const docRef = doc(firestore, "projects", projectId);
  const proj = await getDoc(docRef);
  if (!proj.exists()) {
    return 0;
  }
  const data = proj.data();
  return isNil(proj) || isNil(data) ? 0 : +data.question_num;
};

const getExistQuestionNum = async (projectId: string): Promise<number> => {
  const docRef = collection(firestore, "projects", projectId, "questions");
  const proj = await getDocs(docRef);
  return isNil(proj) ? 0 : +proj.size;
};

const getQuestion = async (user: Auth, projectId: string) => {
  const questions: Array<Question> = [];

  const docsRef = collection(firestore, "projects", projectId, "questions");

  await getDocs(query(docsRef, where("select_user_id", "==", user.id))).then(
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
    console.log("createQuestion - saving to firestore:", {
      no: question.no,
      url: question.url,
      select_user_id: user.id,
      projectId,
    });

    const docRef = await addDoc(
      collection(firestore, "projects", projectId, "questions"),
      {
        no: question.no,
        url: question.url,
        select_user_id: user.id,
      }
    );

    console.log("createQuestion - document created with ID:", docRef.id);
    return { message: "作成が完了しました", variant: "success" };
  } catch (error) {
    console.error("createQuestion error:", error);
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
    no: question.no,
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
    console.log("registerQuestion called with:", {
      user: user.id,
      questions,
      projectId,
    });

    for (const question of questions) {
      if (isNil(question)) continue;

      console.log("Processing question:", question);

      if (question.ID !== "") {
        console.log("Updating existing question:", question.ID);
        await updateQuestion(user, question, projectId);
      } else {
        console.log("Creating new question");
        const result = await createQuestion(user, question, projectId);
        console.log("Create result:", result);
      }
    }

    // 登録後の確認
    const finalCount = await getExistQuestionNum(projectId);
    console.log("Final question count after registration:", finalCount);

    return { message: "問題設定が完了しました", variant: "success" };
  } catch (error) {
    console.error("registerQuestion error:", error);
    return {
      message:
        "問題設定の登録/更新に失敗しました\n時間をあけてから再度操作を実行してください",
      variant: "error",
    };
  }
};

export {
  getQuestion,
  createQuestion,
  updateQuestion,
  registerQuestion,
  getQuestionNum,
  getExistQuestionNum,
};
