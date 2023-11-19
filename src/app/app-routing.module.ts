// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
// import { HomeComponent } from './home/home.component';

// const routes: Routes = [
//   // { path: '', component: AppComponent, pathMatch: 'full' }, // añadir rutas
//   { path: '', component: HomeComponent, pathMatch: 'full' }, // añadir rutas
//   { path: 'login', component: LoginComponent, pathMatch: 'full' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardGuard } from './authguard.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthguardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,  canActivate: [AuthguardGuard]},
  { path: 'registration', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard]  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthguardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
