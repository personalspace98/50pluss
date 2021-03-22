import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../auth/models/user.model';
import { AppComponent } from '../../../app/app.component';
import { Location } from '@angular/common';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Input() user: User;
	@Input() isLoggedIn: boolean;
	@Input() isLoading: boolean;
	@Input() isAdmin: boolean;

	@Output() logout = new EventEmitter<User>();

	login: boolean = false;

	constructor(private appComponent: AppComponent, private location: Location) {
		// this.login = this.appComponent.loggin();
		// console.log('this.login', this.login);
	}

	ngOnInit() {}

	onLogout() {
		this.logout.emit(this.user);
	}

	show() {
		if (this.location.path().includes('/admin/')) {
			return true;
		}
		if (this.location.path().includes('/payment')) {
			return true;
		} else {
			return false;
		}
	}
}
