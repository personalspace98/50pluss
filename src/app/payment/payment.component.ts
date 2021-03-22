import { Component, OnInit, ViewChild } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
	StripeService,
	StripeCardComponent,
	StripeIdealBankComponent,
} from 'ngx-stripe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../reducers/index';
import { getError } from '../auth/store/auth.selectors';
import {
	StripeIdealBankElement,
	StripeCardElementOptions,
	StripeElementsOptions,
} from '@stripe/stripe-js';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/services/auth.service';
import firebase from 'firebase/app';

@Component({
	selector: 'payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
	@ViewChild(StripeCardComponent) card: StripeCardComponent;
	@ViewChild(StripeIdealBankComponent) ideal: StripeIdealBankComponent;

	cardOptions: StripeCardElementOptions = {
		hidePostalCode: true,
		style: {
			base: {
				iconColor: '#666EE8',
				color: '#31325F',
				fontWeight: '300',
				fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
				fontSize: '14px',
				'::placeholder': {
					color: '#CFD7E0',
				},
			},
		},
	};

	elementsOptions: StripeElementsOptions = {
		locale: 'nl',
	};

	stripeTest: FormGroup;

	loginIn: boolean = false;
	registeren: boolean = false;

	loginForm: FormGroup;
	registerForm: FormGroup;
	error$: Observable<string | null>;

	products: any;
	paymentOption: any;

	name: any;
	email: any = '';
	postal: any;

	error: any = '';
	succeed: string = '';

	loading: boolean = false;
	message: string = '';

	constructor(
		private fb: FormBuilder,
		private stripeService: StripeService,
		private store: Store<AppState>,
		private activatedRoute: ActivatedRoute,
		private http: HttpClient,
		private router: Router,
		private afAuth: AngularFireAuth,
		private db: AngularFirestore
	) { }

	ngOnInit() {
		this.paymentOption = this.activatedRoute.snapshot.params.paymentOption;
		this.products = JSON.parse(this.activatedRoute.snapshot.params.products);

		//  this.products.forEach((element: any) => {
		//    console.log(element)
		//  });
		console.log('this.products', this.products);

		this.stripeTest = this.fb.group({
			name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required]),
			postal: new FormControl('', [Validators.required]),
		});

		this.loginForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required),
		});

		this.registerForm = new FormGroup({
			username: new FormControl(),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required]),
		});
	}

	// create token
	// need to retrieve form and create form number
	// after that create payment
	async createToken() {
		this.message = 'Betaling verwerken, even geduld aub';
		this.loading = true;

		const name = this.stripeTest.value.name;
		const email = this.stripeTest.value.email;
		const postal = this.stripeTest.value.postal;

		// data catched out of form
		let data = {
			name: name,
			email: email,
			postal: postal,
			paymentOption: this.paymentOption,
			products: this.products,
			userEmail: this.email,
		};

		const headers = new HttpHeaders().set('Content-Type', 'application/json');

		this.http
			.post(
				'https://us-central1-gj-brieven.cloudfunctions.net/pay',
				JSON.stringify(data),
				{
					headers: headers,
				}
			)
			.subscribe(async (data) => {
				console.log(data);
				if (this.paymentOption == 'creditcard') {
					// confirm creditcard payment
					this.stripeService
						.confirmCardPayment(data.toString(), {
							payment_method: {
								card: this.card.element,
								billing_details: {
									name: name,
								},
							},
						})
						.subscribe(
							(result: any) => {
								console.log('result', result);
								if (result.error.code == "card_declined") {
									this.message = `Kaart geweigerd`;
								} else {
									this.message = `Betaling succesvol, we hebben een mail gestuurd naar ${email}`;
								}
							},
							(e) => {
								console.log('e', e);
								this.message = 'Ooops er iets misgegaan. Neem contact met mij';
							}
						);
				} else {
					// confirm ideal payment
					this.stripeService
						.confirmIdealPayment(data.toString(), {
							payment_method: {
								ideal: this.ideal.element,
							},
							return_url: 'https://gj-brieven.web.app/#/succeed',
						})
						.subscribe(
							(result) => {
								console.log('result', result);
								if (result) {
									this.message = `Betaling succesvol, we hebben een mail gestuurd naar ${email}`;
								}
							},
							(e) => {
								console.log('e', e);
								this.message = 'Ooops er iets misgegaan. Neem contact met mij';
							}
						);
				}
			});
	}

	//login
	onLogin(): void {
		this.loginIn = true;
		this.registeren = false;
		this.error = '';
		this.succeed = '';
	}
	login(): void {
		this.email = this.loginForm.value.email;
		const password = this.loginForm.value.password;

		this.afAuth.auth
			.signInWithEmailAndPassword(this.email, password)
			.then(() => {
				console.log('logged in');
				this.error = '';
				this.succeed = 'Succesvol ingelogd';
			})
			.catch((e: any) => {
				this.email = '';
				console.error(e);
				this.error = e;
			});
	}
	// should register en login
	onRegister(): void {
		this.registeren = true;
		this.loginIn = false;
		this.succeed = '';
		this.error = '';
	}
	register(): void {
		const userName = this.registerForm.value.username;
		this.email = this.registerForm.value.email;
		const password = this.registerForm.value.password;

		if (this.registerForm.valid) {
			// create user doc
			this.afAuth.auth
				.createUserWithEmailAndPassword(this.email, password)
				.then(() => {
					let user = {
						photoUrl:
							'https://www.gravatar.com/avatar/dc15ce3ba50da9baa22cb77e68e36bd9',
						displayName: userName,
						email: this.email,
						brieven: [{}],
						createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
					};
					this.db
						.collection('users')
						.doc(this.email)
						.set(user)
						.then(() => {
							console.log('user succesfully created');
							this.error = '';
							this.succeed = 'Account succesvol aangemaakt';
						})
						.catch((e: any) => {
							this.email = '';
							console.error(e);
						});
				})
				.catch((e: any) => {
					console.error(e);
					this.error = e.message;
				});
		}
	}

	goTo(nav: string) {
		this.router.navigate([nav]).then(() => { });
	}
}
