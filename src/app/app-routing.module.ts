import { NgModule } from '@angular/core';
import {
	Routes,
	RouterModule,
	PreloadAllModules,
	ExtraOptions,
} from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AdminComponent } from './admin/containers/admin/admin.component';
import { AdminGuard } from './admin/guard/admin.guard';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { Adminmain } from './core/main.admin/main.admin.component';
import { AboutComponent } from './about/about.component';
import { BrievenComponent } from './brieven/brieven.component';
import { SollicitatieComponent } from './sollicitatie/sollicitatie.component';
import { TijdlijnComponent } from './tijdlijn/tijdlijn.component';
import { BlogComponent } from './blog/blog.component';
import { BlgComponent } from './blog/blg/blg/blg.component';
import { ContactComponent } from './contact/contact.component';
import { PaymentComponent } from './payment/payment.component';
import { SucceedComponent } from './succeed/succeed.component';

const routerOptions: ExtraOptions = {
	useHash: false,
	anchorScrolling: 'enabled',
	// ...any other options you'd like to use
};
const routes: Routes = [
	{
		path: '',
		component: MainComponent,
	},
	{
		path: 'admin',
		component: HomeComponent,
		children: [
			{
				path: 'main',
				component: Adminmain,
				canActivate: [AuthGuard],
			},
			{
				path: 'brieven',
				loadChildren: () =>
					import('./projects/projects.module').then((m) => m.ProjectsModule),
				canActivate: [AuthGuard],
			},
			{
				path: 'tijdlijn',
				loadChildren: () =>
					import('./customers/customers.module').then((m) => m.CustomersModule),
				canActivate: [AuthGuard],
			},
			{
				path: 'profile',
				loadChildren: () =>
					import('./profile/profile.module').then((m) => m.ProfileModule),
				canActivate: [AuthGuard],
			},
			{
				path: 'charts',
				loadChildren: () =>
					import('./charts/charts.module').then((m) => m.ChartsDataModule),
				canActivate: [AuthGuard],
			},
			{
				path: 'admin-panel',
				component: AdminComponent,
				canActivate: [AdminGuard],
			},
		],
	},
	{ path: 'succeed', component: SucceedComponent },
	{ path: 'payment', component: PaymentComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'blog', component: BlogComponent },
	{ path: 'blg/:id', component: BlgComponent },
	{ path: 'tijdlijn', component: TijdlijnComponent },
	{ path: 'brieven', component: BrievenComponent },
	{ path: 'sollicitatie', component: SollicitatieComponent },
	{ path: 'over-mij', component: AboutComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'home', component: MainComponent },
	{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, routerOptions)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
