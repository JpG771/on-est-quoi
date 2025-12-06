/// Next.js
import { FirebaseServerAppSettings, initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebase.secret";

export const firebaseServerAppSettings: FirebaseServerAppSettings = {
  releaseOnDeref: undefined,
  authIdToken: undefined
}

// Initialize Firebase for server-side rendering
export const setupFirebaseServer: any = (releaseOnDeref: object, token: string) => {
  const serverApp = initializeServerApp(firebaseConfig,
                      { ...firebaseServerAppSettings,
                        releaseOnDeref,
                        authIdToken: token });
  return {
    serverApp,
    serverAuth: getAuth(serverApp)
  }
};