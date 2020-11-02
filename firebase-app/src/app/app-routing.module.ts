import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {UserComponent} from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService} from './auth/auth.service';


 

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
