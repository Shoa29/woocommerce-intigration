import { Component, OnInit } from  '@angular/core';
import { AuthService } from  '../auth/auth.service';
import {NgForm, Form} from '@angular/forms';
import { Router } from '@angular/router';
//import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuth } from  "@angular/fire/auth";

@Component({
selector:  'app-login',
templateUrl:  './login.component.html',
styleUrls: ['./login.component.css'],
providers:[AuthService]
})

export  class  LoginComponent  implements  OnInit {
    error:string = null;
    authState:any ='';
    constructor(private  authService:  AuthService, private router: Router, private af: AngularFireAuth) {
      this.af.authState.subscribe(authState=>{
        this.authState = authState;
      });
     }
    ngOnInit() {}
    onSubmit(form:NgForm){
        if(!form.valid){
          return;
        }
        const email=form.value.email;
        const password = form.value.password;
        this.authService.login(email,password);
        
        this.router.navigate(['/user']);
        


        form.reset();
      }
      reset_pwd(form:NgForm){
        if(!form.valid){
          return;
        }
        const email=form.value.email;
        this.authService.forgotpwd(email);
        form.reset();
      }
}