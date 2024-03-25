import { Routes } from '@angular/router';
import { HomeComponent } from './components/homepage/home/home.component';
import { DashboardComponent } from './components/dashboardPage/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'home' },
];
