import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-footerr",
  templateUrl: "./footerr.component.html",
  styleUrls: ["./footerr.component.css"],
})
export class FooterrComponent implements OnInit {

  payment: boolean = false;
  constructor(private location: Location) {

  }

  ngOnInit(): void {}

  social(type: string) {
    if (type == "fb") {
      window.open(
        "https://m.facebook.com/gerritjan.riedstra.1?fref=nf&pn_ref=story&__tn__=-R"
      );
    } else if (type == "tw") {
      window.open("https://twitter.com/gjee6");
    } else {
      window.open("https://www.linkedin.com/in/gerrit-jan-riedstra-63859519a/");
    }
  }

  show(){
    if (this.location.path().includes("/admin/")) {
      return true;
    } 
    if (this.location.path().includes("/payment")) {
      return true;
    } else {
      return false;
    }
  }
}
