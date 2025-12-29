import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { createUserWithEmailAndPassword, updateProfile, UserCredential, signInWithPopup, GoogleAuthProvider, OAuthCredential, onAuthStateChanged } from 'firebase/auth';
import { firebase } from '../../firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  credential: OAuthCredential | UserCredential | null = null;
  private _user = new BehaviorSubject<any>(firebase.auth?.currentUser ?? null);
  public user$ = this._user.asObservable();
  constructor() {}

  initAuthListener(): void {
    try {
      onAuthStateChanged(firebase.auth, (user) => {
        this._user.next(user ?? null);
      });
    } catch (e) {
      // no-op if auth not available in environment
    }
  }

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

  get currentUser() {
    return this._user.value;
  }

  async signOut(): Promise<void> {
    try {
      if (firebase?.auth?.signOut) {
        await firebase.auth.signOut();
      }
      this._user.next(null);
      this.credential = null;
    } catch (err) {
      // rethrow for caller to handle
      throw err;
    }
  }
}
