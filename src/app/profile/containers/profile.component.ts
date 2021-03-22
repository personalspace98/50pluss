import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../auth/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';
import * as fromAuth from './../../auth/store/auth.actions';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Usr{
  brieven: any, 
  createdAt: any,
  email: string,
  photoUrl: string, 
  userName: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: any;

  data: any = "";
  itemCol: any;

  constructor(private store: Store<AppState>, private db: AngularFirestore,     private afAuth: AngularFireAuth,
    ) { }

  ngOnInit() {
    this.retrieve();
  }

  updateProfile(userData: any) {
    console.log('userData',userData);
    let email = this.afAuth.auth.currentUser;
    let displayName, photoUrl;
    if(userData.displayName){
      displayName = userData.displayName;
      this.db.doc(`users/${email?.email}`).update({displayName: displayName});
    } 
    if(userData.photoUrl){
      photoUrl = userData.photoUrl;
      this.db.doc(`users/${email?.email}`).update({photoUrl: photoUrl});
    }
    //this.store.dispatch(new fromAuth.UpdateProfile(userData));
  }

  logoutUser(user: User) {
    this.store.dispatch(new fromAuth.LogoutRequested({ user }));
  }

  retrieve(){
    let email = this.afAuth.auth.currentUser;
  
    this.itemCol = this.db
    .collection("users", (ref) => ref.where("email", "==", email?.email))
    .valueChanges();

  this.itemCol.subscribe((result: any) => {
    this.user$ = result; 
    console.log("data", this.user$)
  });
  }
}
