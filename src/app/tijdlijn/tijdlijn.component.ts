import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
	selector: 'app-tijdlijn',
	templateUrl: './tijdlijn.component.html',
	styleUrls: ['./tijdlijn.component.css'],
})
export class TijdlijnComponent implements OnInit {
	constructor(private title: Title, private meta: Meta) {
		this.title.setTitle('Tijdlijn | Gerrit Jan | 50pluss');
		this.meta.updateTag({
			name: 'description',
			content:
				'Mijn is Gerrit Jan en deze website gaat over hoe het is om 50pluss te zijn in de crisis. Bekijk mijn complete tijdlijn door een account aan te maken.',
		});
	}

	ngOnInit(): void {
		window.scroll(0, 0);
	}
}
