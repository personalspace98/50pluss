import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { tap, map } from 'rxjs/operators';

export interface Blog {
	title: string;
	description: string;
	txt: {};
	img: string;
	type: string;
}
export interface Related {
	title: string;
	description: string;
	img: string;
	date: number;
}

@Component({
	selector: 'app-blg',
	templateUrl: './blg.component.html',
	styleUrls: ['./blg.component.css'],
})
export class BlgComponent implements OnInit {
	@Input()
	title: any;

	data: any;
	itemCol: any;
	db: AngularFirestore;

	related: Related[] = [];

	router: Router;

	constructor(
		private route: ActivatedRoute,
		router: Router,
		db: AngularFirestore
	) {
		this.db = db;
		this.router = router;

		// Capture the access token and code
		let title = this.route.snapshot.params.id;
		console.log(title);
		this.itemCol = this.db
			.collection('blog', (ref) => ref.where('title', '==', title))
			.valueChanges();

		this.itemCol.subscribe((result: any) => {
			console.log('result: ', result);
			this.data = result[0];
			console.log('data: ', this.data);
		});

		// There isn't a ! operator in Firebase (kinda f ugly :-))
		this.itemCol = this.db.collection('blog').valueChanges();

		this.itemCol.subscribe((result: any) => {
			console.log('result all: ', result);
			result.forEach((element: any) => {
				console.log('element: ', element);
				element.date = element.date.toDate();
				if (element.title != this.data.title) {
					this.related.push(element);
				}
			});
			console.log('related: ', this.related);
		});
	}

	ngOnInit(): void { }

	share(type: string): void {
		let url = window.location.href;

		console.log('url', url)
		if (type == 'fb') {
			window.open(`http://www.facebook.com/sharer.php?u=${url}`);
		} else if (type == 'tw') {
			window.open(`https://twitter.com/share?url=${url}`);
		} else if (type == 'gp') {
			window.open(`https://www.linkedin.com/sharing/share-offsite/?url=www.50pluss.nl/blg/Rozen%20en%20valkuilen`);
		}
	}

	rout(url: string) {
		this.router.navigate(['/blg', url]).then(() => {
			window.location.reload();
		});
	}
}
