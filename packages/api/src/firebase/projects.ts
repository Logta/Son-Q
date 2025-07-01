import type { Auth, Project } from "@son-q/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../plugins/firebase";

const getProject = async (user: Auth) => {
  const projects: Array<Project> = [];

  const usersRef = collection(firestore, "projects");

  await getDocs(
    query(
      usersRef,
      where("participants", "array-contains", {
        user_id: user.id,
        user_name: user.name,
      })
    )
  ).then((snapshot) => {
    snapshot.forEach((doc) => {
      projects.push({
        name: doc.data().name,
        content: doc.data().content,
        creater: doc.data().creater,
        question_num: doc.data().question_num,
        project_mode: doc.data().project_mode,
        ID: doc.id,
        participants: doc.data().participants,
      });
    });
  });

  return projects;
};

const createProject = async (user: Auth, data: Project) => {
  try {
    await addDoc(collection(firestore, "projects"), {
      name: data.name,
      content: data.content,
      question_num: data.question_num,
      creater: user.id,
      project_mode: data.project_mode,
      participants: [
        {
          user_id: user.id,
          user_name: user.name,
        },
      ],
    });
    return { message: "作成が完了しました", variant: "success" };
  } catch {
    return { message: "作成に失敗しました", variant: "error" };
  }
};

const deleteProject = async (index: string) => {
  try {
    await deleteDoc(doc(firestore, "projects", index));

    return { message: "削除が完了しました", variant: "success" };
  } catch (_error) {
    return { message: "削除に失敗しました", variant: "error" };
  }
};

///プロジェクトに参加する
const joinProject = async (user: Auth, id: string) => {
  const docRef = doc(firestore, "projects", id);
  try {
    const doc = await getDoc(docRef);
    if (!doc.exists) {
      return { message: "入力IDはありません", variant: "error" };
    }
    const docData = doc.data();
    if (!docData) return { message: "データの取得に失敗しました", variant: "error" };
    const participants = structuredClone(docData.participants);
    const exist =
      Array.isArray(docData.participants) &&
      docData.participants.some(
        (p) => typeof p === "object" && p !== null && "user_id" in p && p.user_id === user.id
      );
    if (exist) return { message: "すでに参加しています", variant: "warning" };

    participants.push({
      user_id: user.id,
      user_name: user.name,
    });
    try {
      await updateDoc(docRef, {
        participants: participants,
      });
      return { message: "更新が完了しました", variant: "success" };
    } catch {
      return { message: "更新に失敗しました", variant: "error" };
    }
  } catch {
    return { message: "更新に失敗しました", variant: "error" };
  }
};

const getProjectFromID = async (projectId: string) => {
  if (!projectId || typeof projectId !== "string" || projectId.trim().length === 0) {
    throw new Error("Invalid project ID provided");
  }

  const docRef = doc(firestore, "projects", projectId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      name: data.name,
      content: data.content,
      creater: data.creater,
      question_num: data.question_num,
      ID: docSnap.id,
      participants: data.participants,
      project_mode: data.project_mode,
    };
  } else {
    console.warn("Project document not found for ID:", projectId);
    return null;
  }
};

const updateProject = async (projectId: string, data: Project) => {
  const washingtonRef = doc(firestore, "projects", projectId);

  try {
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      name: data.name,
      content: data.content,
      question_num: data.question_num,
      project_mode: data.project_mode,
    });
    return { message: "更新が完了しました", variant: "success" };
  } catch {
    return { message: "更新に失敗しました", variant: "error" };
  }
};

export { getProject, createProject, deleteProject, joinProject, getProjectFromID, updateProject };
