import { Component, OnInit } from "@angular/core";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
 

  constructor(
    private title: Title, private meta: Meta
  ) {
    this.title.setTitle('Gebruiker paneel | Gerrit Jan | 50pluss');
		this.meta.updateTag({
			name: 'description',
			content:
				'',
		});
  }

  ngOnInit() {

  }

 
}
