import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '' , component:DashboardComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'profile', component: ProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
