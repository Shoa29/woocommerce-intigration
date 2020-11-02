import { Component, OnInit } from '@angular/core';
import {NgForm, Form} from '@angular/forms';
import { AuthService, UserDetails } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { User } from 'firebase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[AuthService]
})
export class RegisterComponent implements OnInit {
  error:string = null;
  uid:string = null;
  constructor(private authService: AuthService,  public firestore:AngularFirestore,private router:Router ) { }
  //userCollection: AngularFirestoreCollection<UserDetails>;
  userObservable: Observable<UserDetails[]>;
  userDocument: AngularFirestoreDocument<UserDetails>;
  

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const email=form.value.email;
    const password = form.value.password;
    this.authService.signup(email,password).then(()=>{
      this.router.navigate(['/user']);
    })
    
    form.reset();
  }

}
