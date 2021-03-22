import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll-core';
import { ToastrService } from 'ngx-toastr';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
} from '@angular/forms';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
	contactForm: FormGroup;

	constructor(
		private pageScrollService: PageScrollService,
		@Inject(DOCUMENT) private document: any,
		private title: Title,
		private meta: Meta,
		private router: Router,
		private http: HttpClient
	) {
		// this.contactForm = new FormGroup({
		//   email: new FormControl("", [Validators.required]),
		// });
		this.title.setTitle('Home | Gerrit-Jan | 50+');
		this.meta.updateTag({
			name: 'description',
			content:
				'Mijn is Gerrit-Jan en deze website gaat over hoe het is om 50+te zijn in de crisis. Bekijk mijn sollicitaties of koop 1 van mijn brieven',
		});

		this.contactForm = new FormGroup({
			name: new FormControl('', [Validators.required]),
			subject: new FormControl('', [Validators.required]),
			message: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
		});
	}

	ngOnInit() {}

	scrollTo(id: string) {
		this.pageScrollService.scroll({
			document: this.document,
			scrollTarget: id,
		});
	}

	openUrl(url: string) {
		window.open(url);
	}

	openEmail() {
		window.location.href = 'mailto:joepvdpol1998@gmail.com?subject=Contact';
	}

	navigate(url: any) {
		this.router.navigateByUrl(url);
	}

	email() {
		const name = this.contactForm.value.name;
		const email = this.contactForm.value.email;
		const subject = this.contactForm.value.subject;
		const message = this.contactForm.value.message;

		let data = {
			name: name,
			email: email,
			subject: subject,
			message: message,
		};

		console.log('data', data);
		const headers = new HttpHeaders().set('Content-Type', 'application/json');

		this.http
			.post(
				'https://us-central1-gj-brieven.cloudfunctions.net/contact',
				JSON.stringify(data),
				{
					headers: headers,
				}
			)
			.subscribe((result) => {
				console.log('result', result);
				alert('email is verzonden');
			});
	}
}
