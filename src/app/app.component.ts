import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { Observable } from 'rxjs';
import { User } from './auth/models/user.model';
import {
	getUser,
	getIsLoggedIn,
	getIsLoading,
	getIsAdmin,
} from './auth/store/auth.selectors';

import * as fromAuth from './auth/store/auth.actions';
import { Location } from '@angular/common';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface Users {
	userName: string;
	email: string;
	letters: [{}];
}
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	user$: Observable<User | null>;
	isLoggedIn$: Observable<boolean>;
	isLoading$: Observable<boolean>;
	isAdmin$: Observable<boolean>;

	login: boolean = false;
	paymentPage: boolean = false;

	itemCol: AngularFirestoreCollection<Users>;
	db: AngularFirestore;
	data: any;

	constructor(
		private store: Store<AppState>,
		private location: Location,
		private title: Title,
		private meta: Meta,
		private router: Router
	) {}

	ngOnInit() {
		this.user$ = this.store.select(getUser);
		this.isLoggedIn$ = this.store.select(getIsLoggedIn);
		this.isLoading$ = this.store.select(getIsLoading);
		this.isAdmin$ = this.store.select(getIsAdmin);

		this.title.setTitle('Home | Gerrit-Jan | 50+');
		this.meta.updateTag({
			name: 'description',
			content:
				'Mijn is Gerrit-Jan en deze website gaat over hoe het is om 50+te zijn in de crisis. Bekijk mijn sollicitaties of koop 1 van mijn brieven',
		});

		if (this.location.path().includes('/admin/')) {
			this.login = true;
			console.log(this.location.path());
		} else {
			this.login = false;
		}
	}

	onLogout(user: User) {
		this.store.dispatch(new fromAuth.LogoutRequested({ user }));
	}

	// check if user is logged for home navbar
	logginIn(login: boolean) {
		if (this.location.path().includes('/admin/')) {
			this.login = true;
			console.log(this.location.path());
		} else {
			this.login = login;
		}
		return login;
	}
	loggin() {
		return this.login;
	}
}
