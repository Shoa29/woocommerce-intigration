import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import * as firebase from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
//import { AngularFireAuth } from 'angularfire2/auth';
import {HttpClientModule,  HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {throwError, BehaviorSubject, Observable} from 'rxjs';
import {User} from './user.model';


export interface UserDetails{
 idToken?:string;
  email:string;
  password:string;
  name?:string;
  url?:string;
}
export interface AuthResponseData{
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn: string;
  localId:string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  user = new BehaviorSubject<User>(null);
  //currUser = new Observable<firebase.User>();
  currUser = null;
  constructor(private http: HttpClient, private afAuth: AngularFireAuth){
    this.afAuth.authState.subscribe(userData=>{
      this.currUser = userData;
    })

  
  }
  signup(email:string, password:string ){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(() => console.log('successfully registered') )
    .catch(error => this.handleError(error) );

  }
  login(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then(() => console.log('success') )
    .catch(error => this.handleError(error) );
  }
  logout() {
     this.afAuth.signOut();
  }
  forgotpwd(email:string){
    const fbAuth = firebase.auth();
    fbAuth.sendPasswordResetEmail(email)

  }
  /*private handleAuthentication(email:string, userId: string, token:string, expiresIn:number, ){
    const expirationDate = new Date(new Date().getTime() + expiresIn *1000)
      const user = new User(email, userId, token, expirationDate);
      this.user.next(user);
  }*/
  private handleError(err: HttpErrorResponse){
    let errorMsg = 'An unknown error occurred!';
      if(!err.error){
        return throwError(errorMsg);
      }else if(!err.error.error){
        return throwError(errorMsg);
      }
      switch(err.error.error.message){
        case 'EMAIL_EXISTS':
          errorMsg = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMsg='email not found';
          break;
        case 'INVALID_PASSWORD':
          errorMsg='invalid password';
          break;
      }
      return throwError(errorMsg);

  }
 /* user: User;
  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
   }
   async login(email: string, password: string) {
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['user']);
}
async register(email: string, password: string) {
  var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  this.sendEmailVerification();
}
async sendEmailVerification() {
  await this.afAuth.auth.currentUser.sendEmailVerification()
  this.router.navigate(['verify-email']);
}
async logout(){
  await this.afAuth.auth.signOut();
  localStorage.removeItem('user');
  this.router.navigate(['login']);
}
get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}
 */ 


  
}
