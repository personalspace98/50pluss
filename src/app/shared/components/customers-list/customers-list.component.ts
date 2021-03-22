import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Customer } from "../../../customers/models/customer.model";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface CustomerId extends Customer {
  id: string;
}
@Component({
  selector: "app-customers-list",
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.scss"],
})
export class CustomersListComponent implements OnInit {
  @Input() customers: Customer[];
  @Output() customerDeleted = new EventEmitter<Customer>();
  @Output() customerEdited = new EventEmitter<Customer>();

  customers$: Observable<Customer[]>;
  private itemCol: AngularFirestoreCollection<Customer>;

  constructor(db: AngularFirestore) {
    this.customers = [];
    // console.log(this.customers);
    this.itemCol = db.collection<Customer>("subscribers");

    this.customers$ = this.itemCol.valueChanges();
    this.customers$.subscribe((value) => {
      this.customers = value;
      console.log("value", value);
    });

    // this.customers$ = this.itemCol.snapshotChanges().pipe(
    //   map((actions) =>
    //     actions.map((a) => {
    //       // THIS LINE IS SLIGHTLY DIFFERENT
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       console.log(id);
    //       return { id, ...data };
    //     })
    //   )
    // );
  }
  ngOnInit() {}

  onEdit(customer: Customer) {
    this.customerEdited.emit(customer);
  }

  onDelete(customer: Customer) {
    this.customerDeleted.emit(customer);
  }

  trackByFn(index: any) {
    return index;
  }
}
