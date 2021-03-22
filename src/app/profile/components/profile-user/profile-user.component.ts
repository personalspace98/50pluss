import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { User } from "../../../auth/models/user.model";
import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Component({
  selector: "app-profile-user",
  templateUrl: "./profile-user.component.html",
  styleUrls: ["./profile-user.component.scss"],
})
export class ProfileUserComponent implements OnInit {
  @Input() user: any;
  @Output() logout = new EventEmitter<any>();

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
  }

  onLogout() {
    this.logout.emit(this.user);
  }
}
