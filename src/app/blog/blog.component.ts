import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

export interface Blog {
	title: string;
	description: string;
	text: string;
	type: string;
}

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
	blogs$: Observable<Blog[] | null>;

	itemCol: AngularFirestoreCollection<Blog>;
	db: AngularFirestore;
	data: any;
	error: string; 
	
	constructor(
		db: AngularFirestore, private router: Router,
		private title: Title, private meta: Meta) {
		this.itemCol = db.collection<Blog>('blog');

		console.log(this.itemCol);
		this.blogs$ = this.itemCol.valueChanges();
		this.blogs$.subscribe((item) => {
			this.data = item;
		});
		// console.log('this.data', this.data);
		if (typeof this.data === 'undefined') {
			// this.error = 'Er zijn nog geen blogs';
		}
		this.db = db;

		this.title.setTitle('Blog | Gerrit Jan | 50pluss');
		this.meta.updateTag({
			name: 'description',
			content:
				'Mijn is Gerrit Jan en deze website gaat over hoe het is om 50pluss te zijn in de crisis. Hier kan je mijn blogs vinden die helemaal gratis zijn."',
		});
	}

	ngOnInit(): void {
		window.scroll(0, 0);
	}
}
