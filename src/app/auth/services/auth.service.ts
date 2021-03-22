import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { from } from "rxjs";
import firebase from "firebase/app";
import { AngularFireDatabase } from "@angular/fire/database";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  router: Router;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    rtr: Router,
    private cdb: AngularFirestore
  ) {
    this.router = rtr;
  }

  register(email: string, password: string, userName: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = {
          photoUrl: "https://www.gravatar.com/avatar/dc15ce3ba50da9baa22cb77e68e36bd9",
          displayName: userName,
          email: email,
          brieven: [{}],
          createdAt: firebase.firestore.Timestamp.fromDate(new Date())
        }
        this.cdb
          .collection("users").doc(email).set(user)
          .then(() => {
            console.log("user succesfully created");
            //this.router.navigate(["/admin/main"]);
          })
          .catch((e) => {
            console.error(e);
          });
      });
    return from(this.router.navigateByUrl("/admin/main"));
  }

  updateProfile(displayName: string, photoUrl: string) {
    const userProfile = this.afAuth.auth.currentUser;
    if (userProfile) {
      return <any>from(
        userProfile.updateProfile({
          displayName: displayName,
          photoURL: photoUrl,
        })
      );
    }
  }

  login(email: string, password: string) {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  socialLogin(authProvider: string) {
    let provider: any;
    if (authProvider === "google") {
      provider = new firebase.auth.GoogleAuthProvider();
    }

    if (authProvider === "facebook") {
      provider = new firebase.auth.FacebookAuthProvider();
    }

    if (authProvider === "twitter") {
      provider = new firebase.auth.TwitterAuthProvider();
    }
    return from(this.afAuth.auth.signInWithPopup(provider));
  }

  logout(uid: string) {
    this.updateOnlineStatus(uid, false);
    return from(this.afAuth.auth.signOut());
  }

  saveUser(user: User) {
    const users = this.db.object("users/" + user.uid);
    return users.set(user);
  }

  updateOnlineStatus(uid: string, status: boolean) {
    if (status) {
      this.db.database
        .ref()
        .child("users/" + uid)
        .onDisconnect()
        .update({ isOnline: false });
    }
    return from(this.db.object("users/" + uid).update({ isOnline: status }));
  }

  checkUserRole(uid: string) {
    return this.db.object("admins/" + uid).valueChanges();
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }
}
