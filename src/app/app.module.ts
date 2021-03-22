import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ModalModule } from 'angular-bootstrap-md';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { FooterrComponent } from './footerr/footerr.component';
import { BrievenComponent } from './brieven/brieven.component';
import { BriefComponent } from './brief/brief.component';
import { PaymentComponent } from './payment/payment.component';
import { SollicitatieComponent } from './sollicitatie/sollicitatie.component';
import { TijdlijnComponent } from './tijdlijn/tijdlijn.component';
import { BlogComponent } from './blog/blog.component';
import { BlgComponent } from './blog/blg/blg/blg.component';
import { ContactComponent } from './contact/contact.component';
import { NgxStripeModule } from 'ngx-stripe';
import { SucceedComponent } from './succeed/succeed.component';

import { ShareModule } from 'ngx-sharebuttons';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    AboutComponent,
    FooterrComponent,
    BrievenComponent,
    BriefComponent,
    PaymentComponent,
    SollicitatieComponent,
    TijdlijnComponent,
    BlogComponent,
    BlgComponent,
    ContactComponent,
    SucceedComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    ModalModule.forRoot(),
    AdminModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    CoreModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
      metaReducers,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    MDBBootstrapModule.forRoot(),
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxStripeModule.forRoot('live_key'),
    ShareModule,
  ],
  providers: [
    AngularFirestoreModule,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
