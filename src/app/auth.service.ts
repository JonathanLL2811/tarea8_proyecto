import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore, private router: Router) { }

  async register(email: string, password: string, firstName: string, lastName: string, identityNumber: string, phoneNumber: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Crea un documento en la colección 'users' con el UID como ID del documento
      const userDocRef = doc(this.firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        identityNumber: identityNumber,
        phoneNumber: phoneNumber,
        // No guardes la contraseña aquí.  Firebase Auth maneja eso de forma segura.
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/tabs']); // Cambia '/home' por '/tabs'
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      throw error;
    }
  }
}