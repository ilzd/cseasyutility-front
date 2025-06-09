import { Routes } from '@angular/router';
import { LineupListComponent } from './pages/lineup-list/lineup-list.component';
import { LineupDetailComponent } from './pages/lineup-detail/lineup-detail.component';
import { LineupFormComponent } from './pages/lineup-form/lineup-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'lineups', pathMatch: 'full' },
  { path: 'lineups', component: LineupListComponent },
  { path: 'lineups/create', component: LineupFormComponent },
  { path: 'lineups/:id', component: LineupDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
