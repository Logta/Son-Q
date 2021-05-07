import { firestore } from "@/plugins/firebase";
import { Auth, Project } from "@/models";

const getProject = async (user: Auth) => {
  const projects: Array<Project> = [];

  let snapShot = await firestore
    .collection("projects")
    .where("participants", "array-contains", {
      user_id: user.id,
      user_name: user.name,
    })
    .get();
  snapShot.docs.map((doc) => {
    console.log(doc.data().participants);
    projects.push({
      name: doc.data().name,
      content: doc.data().content,
      creater: doc.data().creater,
      questionNum: doc.data().questionNum,
      ID: doc.id,
      participants: doc.data().participants,
    });
  });

  return projects;
};

const createProject = async () => {
  // let snapShot = await firestore
  //   .collection("projects")
  //   .where("participants", "array-contains", {
  //     user_id: user.uid,
  //     user_name: user.displayName,
  //   })
  //   .get();
  // snapShot.docs.map((doc) => {
  //   this.projects.push({
  //     name: doc.data().name,
  //     content: doc.data().content,
  //     creater: doc.data().creater,
  //     questionNum: doc.data().questionNum,
  //     id: doc.id,
  //     participants: doc.data().participants,
  //   });
  // });
};

export { getProject, createProject };
