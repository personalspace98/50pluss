import { Component, OnInit } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { Project } from '../models/project.model';
import { AppState } from '../../reducers/index';
import { Store, select } from '@ngrx/store';
import * as fromProjects from './../store/projects.actions';
import { Observable, from, of } from 'rxjs';
import { getProjects, getAllLoaded } from '../store/projects.selectors';
import { take, map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { ProjectModalComponent } from '../../shared/components/project-modal/project-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
	user$: any;
	letters: string[] = [];

	itemCol: any;
	db: AngularFirestore;
	loaded: boolean = false;

	constructor(private afAuth: AngularFireAuth, db: AngularFirestore) {
		this.db = db;
	}

	ngOnInit() {
		let user = this.afAuth.auth.currentUser;

		this.itemCol = this.db
			.collection('users', (ref) => ref.where('email', '==', user?.email))
			.valueChanges();

		this.itemCol.subscribe((result: any) => {
			this.user$ = result;
			console.log('data', this.user$);

			let brieven = result[0].brieven;

			brieven.forEach((element: any) => {
				console.log('element', element);
				if (Object.entries(element).length !== 0) {
					this.itemCol = this.db
						.collection('brieven/')
						.doc(element)
						.valueChanges();

					this.itemCol.subscribe((result: any) => {
						console.log('result', result);
						this.letters.push(result);
						console.log('this.letters', this.letters);
					});
				}
			});
		});
	}
}
