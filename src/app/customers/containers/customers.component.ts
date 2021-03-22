import { Component, OnInit, OnDestroy } from "@angular/core";
import { MDBModalRef, MDBModalService } from "angular-bootstrap-md";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers/index";

import * as fromCustomers from "./../store/customers.actions";
import { Customer } from "../models/customer.model";
import { Subscription, Observable } from "rxjs";
import { getCustomers, getIsLoading } from "../store/customers.selectors";
import { take, map } from "rxjs/operators";
import { ConfirmModalComponent } from "../../shared/components/confirm-modal/confirm-modal.component";
import { CustomersModalComponent } from "../../shared/components/customers-modal/customers-modal.component";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";


@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent implements OnInit {

  itemCol: AngularFirestoreCollection<Customer>;
  db: AngularFirestore;

  constructor(
    private afAuth: AngularFireAuth,
    db: AngularFirestore
  ) {
    this.db = db;
  }

  ngOnInit() {
   
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }
}
