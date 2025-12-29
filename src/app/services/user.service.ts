import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, updateProfile, UserCredential, signInWithPopup, GoogleAuthProvider, OAuthCredential } from 'firebase/auth';
import { firebase } from '../../firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  credential: OAuthCredential | UserCredential | null = null;
  constructor() {}

  async createAccount(email: string, password: string, displayName?: string) {
    try {
      this.credential = await createUserWithEmailAndPassword(firebase.auth, email, password);
      if (displayName && this.credential.user) {
        await updateProfile(this.credential.user, { displayName });
      }
      return this.credential;
    } catch (err) {
      throw err;
    }
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const result = await signInWithPopup(firebase.auth, provider);
      this.credential = GoogleAuthProvider.credentialFromResult(result);
      return this.credential;
    } catch (err) {
      throw err;
    }
  }
}
