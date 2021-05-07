import { auth, firebase } from "@/plugins/firebase";
import { Auth } from "@/models";

const awaitOnAuth = async (): Promise<Auth> => {
  return new Promise(function (resolve, reject) {
    auth.onAuthStateChanged((user: any) => {
      if (user) {
        resolve({
          ok: true,
          id: user.uid,
          name: user.displayName,
        });
      } else {
        reject({
          ok: false,
          id: "",
          name: "",
        });
      }
    });
  });
};

const awaitOnLogin = async (): Promise<Auth> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return new Promise(function (resolve, reject) {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        resolve({
          ok: true,
          id: user.uid,
          name: user.displayName,
        });
      })
      .catch((_) => {
        reject({
          ok: false,
          id: "",
          name: "",
        });
      });
  });
};

export { awaitOnAuth, awaitOnLogin };
