import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Meta, Title } from '@angular/platform-browser';

export interface Letters {
	title: string;
	description: string;
	price: DoubleRange;
}

export interface Product {
	title: string;
	description: string;
	qty: number;
	price: DoubleRange;
}
@Component({
	selector: 'app-brieven',
	templateUrl: './brieven.component.html',
	styleUrls: ['./brieven.component.css'],
})
export class BrievenComponent implements OnInit {
	letters$: Observable<Letters[] | null>;

	itemCol: AngularFirestoreCollection<Letters>;
	db: AngularFirestore;
	data: any;

	products$: any = [];

	paymentOption: string;
	router: Router;

	constructor(
		db: AngularFirestore, rtr: Router,
		private title: Title, private meta: Meta) {
		this.itemCol = db.collection<Letters>('brieven', ref => ref.orderBy('date'));

		console.log(this.itemCol);
		this.letters$ = this.itemCol.valueChanges();
		this.letters$.subscribe((item) => {
			console.log('item', item);
			this.data = item;
		});

		this.db = db;
		this.router = rtr;
		this.paymentOption = 'ideal';

		this.title.setTitle('Brieven | Gerrit Jan | 50pluss');
		this.meta.updateTag({
			name: 'description',
			content:
				'Kom erachter hoe het is om 50plusser te zijn in de crisis tijd. Hier kan je mijn brieven kopen en erachter hoe het is om 50pluss te zijn in de crisis.',
		});
	}

	ngOnInit(): void {
		window.scroll(0, 0);
	}

	addToCard(title: string, description: string, qty: number) {
		let product = {
			title: title,
			description: description,
			qty: qty,
			price: 1.5,
		};
		this.products$.push(product);
	}

	remove(index: number) {
		console.log(index);
		any: index = this.products$.indexOf(index);
		this.products$.splice(index, 1);
		console.log(this.products$);
	}

	pay() {
		// let data = {
		//   products: this.products$,
		//   paymentOption: this.paymentOption
		// }
		console.log(JSON.stringify(this.products$));
		this.router.navigate([
			'payment',
			{
				products: JSON.stringify(this.products$),
				paymentOption: this.paymentOption,
			},
		]);
	}
}
