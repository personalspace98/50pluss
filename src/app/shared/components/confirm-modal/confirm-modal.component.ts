import { Component, OnInit, Input } from "@angular/core";
import { MDBModalRef } from "angular-bootstrap-md";
import { Subject } from "rxjs";
import { Project } from "../../../projects/models/project.model";

export interface projectInterface {
  title: string;
  description: string;
  photoUrl: string;
}
@Component({
  selector: "app-confirm-modal",
  templateUrl: "./confirm-modal.component.html",
  styleUrls: ["./confirm-modal.component.scss"],
})
export class ConfirmModalComponent implements OnInit {
  @Input() project: Project;

  confirmation: Subject<boolean> = new Subject();

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit() {}

  onProjectDelete() {
    this.confirmation.next(true);
    this.modalRef.hide();
  }
}
