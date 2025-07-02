import type { Auth } from "@son-q/types";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "../plugins/firebase";

const awaitOnAuth = async (): Promise<Auth> => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        resolve({
          ok: true,
          id: user.uid,
          name: user.displayName || "",
        });
      } else {
        console.error("Authentication failed");
        reject({
          ok: false,
          id: "",
          name: "",
        });
      }
    });
  });
};

const awaitOnGoogleLogin = async (): Promise<Auth> => {
  const provider = new GoogleAuthProvider();

  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const _token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        resolve({
          ok: true,
          id: user.uid,
          name: user.displayName || "",
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const _email = error.email;
        const _credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Google login error:", errorCode, errorMessage);
        reject({
          ok: false,
          id: "",
          name: "",
        });
      });
  });
};

const awaitOnPasswordLogin = async (data: { email: string; password: string }): Promise<Auth> => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        resolve({
          ok: true,
          id: user.uid,
          name: user.displayName || "",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Password login error:", errorCode, errorMessage);
        reject({
          ok: false,
          id: "",
          name: "",
        });
      });
  });
};

const signOutFirebase = async (): Promise<Auth> => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve({
          ok: true,
          id: "",
          name: "",
        });
      })
      .catch((error) => {
        reject({
          ok: false,
          id: "",
          name: `ログアウト時にエラーが発生しました (${error})`,
        });
      });
  });
};

const createPasswordUser = async (data: { email: string; password: string }): Promise<boolean> => {
  try {
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    return true;
  } catch (e) {
    console.error("Create user error:", e instanceof Error ? e.message : String(e));
    return false;
  }
};

export {
  awaitOnAuth,
  awaitOnGoogleLogin,
  awaitOnPasswordLogin,
  createPasswordUser,
  signOutFirebase,
};
