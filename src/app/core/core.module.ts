import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { Adminmain } from "./main.admin/main.admin.component";

import {
  NavbarModule,
  DropdownModule,
  CardsModule,
  ButtonsModule,
  IconsModule,
} from "angular-bootstrap-md";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    IconsModule,
    RouterModule,
    DropdownModule.forRoot(),
    CardsModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    Adminmain,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent,
  ],
  exports: [HeaderComponent, FooterComponent, WelcomeComponent, HomeComponent],
})
export class CoreModule {}
