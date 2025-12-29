import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import { firebase } from '../../firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  credential: UserCredential | null = null;
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
}
