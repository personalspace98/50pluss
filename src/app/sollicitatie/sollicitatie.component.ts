import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
	selector: 'app-sollicitatie',
	templateUrl: './sollicitatie.component.html',
	styleUrls: ['./sollicitatie.component.css'],
})
export class SollicitatieComponent implements OnInit {
	os: string;
	extension: string;
	constructor(private title: Title, private meta: Meta) {
		this.title.setTitle('Sollicitaties | Gerrit Jan | 50pluss');
		this.meta.updateTag({
			name: 'description',
			content:
				'Mijn is Gerrit Jan en deze website gaat over hoe het is om 50pluss te zijn in de crisis. Bekijk hier mijn sollicitatiebrieven.',
		});
	}

	ngOnInit(): void {
		window.scroll(0, 0);
	}
}
