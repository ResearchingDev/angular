import { Routes } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { ReportComponent } from './client/report/report.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'report', component: ReportComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
];
