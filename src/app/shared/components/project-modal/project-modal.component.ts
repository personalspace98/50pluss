import { Component, OnInit, ViewChild } from "@angular/core";
import { MDBModalRef } from "angular-bootstrap-md";
import { Project } from "../../../projects/models/project.model";
import { NgForm } from "@angular/forms";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { finalize, tap } from "rxjs/operators";

export interface projectInterface {
  title: string;
  description: string;
  photoUrl: string;
}
@Component({
  selector: "app-project-modal",
  templateUrl: "./project-modal.component.html",
  styleUrls: ["./project-modal.component.scss"],
})
export class ProjectModalComponent implements OnInit {
  @ViewChild("projectForm", { static: true }) projectForm: NgForm;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  heading: string;

  title: string;
  description: string;
  photoUrl: string;
  url: string;

  projectData: Subject<Project> = new Subject();
  project: Project = {};

  db: AngularFirestore;

  file: File[] = [];
  selectedFile: File;
  fb: string;
  downloadURL: Observable<string>;
  uploaded: boolean;
  success: boolean;
  private itemCol: AngularFirestoreCollection<projectInterface>;
  constructor(
    public modalRef: MDBModalRef,
    db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.db = db;
  }

  ngOnInit() {}

  onSave() {
    let value = this.heading.substr(0, this.heading.indexOf(" ")).toLowerCase(); // "tocirah sneab"    ;
    if (this.projectForm.valid) {
      let data = {
        title: this.project.title as string,
        description: this.project.description as string,
        photoUrl: this.fb as string,
        url: this.project.url as string,
      };
      if (data.url == null) {
        data.url = "";
      }
      if (value == "edit") {
        console.log(this.project.id);
        this.db.doc(`projects/${this.project.id}`).update(data);
      } else if (value == "add") {
        this.itemCol = this.db.collection<projectInterface>("projects");
        // this.item = this.itemCol.valueChanges();

        this.itemCol.add(data);
      }
      this.modalRef.hide();
    } else {
      const controls = this.projectForm.controls;
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
    }
  }

  async startUpload(event: any) {
    this.uploaded = true;
    this.success = false;
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `img/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`img/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              this.uploaded = true;
              this.success = true;
            } else {
              this.uploaded = false;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }
}
