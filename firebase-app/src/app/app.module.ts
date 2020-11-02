import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { FormBuilder, FormGroup , FormsModule } from '@angular/forms';
import {HttpClientModule,  HttpClient} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
//import { AngularFireAuthModule } from 'angularfire2/auth';
const redirectUser = () => redirectUnauthorizedTo(['/login']);
const  routes:  Routes  = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {path:'register', component:RegisterComponent},
   {path:'user',component: UserComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUser}},
   {path:'login', component:LoginComponent}
   ];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule , ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
