import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
	constructor(private title: Title, private meta: Meta) {
		this.title.setTitle('Over mij | Gerrit Jan | 50pluss');
		this.meta.updateTag({
			name: 'description',
			content:
				'Mijn is Gerrit Jan en deze website gaat over hoe het is om 50pluss te zijn in de crisis. Kom erachter wie ik ben en bekijk mijn "Tekeningen"',
		});
	}

	ngOnInit(): void {
		window.scroll(0, 0);
	}

	openURL(url: string) {
		window.open(url);
	}
}
