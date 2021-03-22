import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	loggin: boolean = false;

	payment: boolean = false;

	constructor(private location: Location, private router: Router) {}

	ngOnInit(): void {
		// this.show();
	}

	social(type: string) {
		if (type == 'fb') {
			window.open(
				'https://m.facebook.com/gerritjan.riedstra.1?fref=nf&pn_ref=story&__tn__=-R'
			);
		} else if (type == 'tw') {
			window.open('https://twitter.com/gjee6');
		} else {
			window.open('https://www.linkedin.com/in/gerrit-jan-riedstra-63859519a/');
		}
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
