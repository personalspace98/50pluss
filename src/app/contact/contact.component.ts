import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
	contactForm: FormGroup;

	constructor(private http: HttpClient, private title: Title, private meta: Meta) {
		this.contactForm = new FormGroup({
			name: new FormControl('', [Validators.required]),
			subject: new FormControl('', [Validators.required]),
			message: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
		});

		this.title.setTitle('Contact | Gerrit Jan | 50pluss');
		this.meta.updateTag({
			name: 'description',
			content:
				'Mijn is Gerrit Jan en deze website gaat over hoe het is om 50pluss te zijn in de crisis. Kom hier in contact met mij.',
		});
	}

	ngOnInit(): void {}

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
