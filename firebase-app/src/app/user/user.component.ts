import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { FormBuilder, FormGroup , FormsModule, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule , HttpHeaders, HttpParams} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
//import * as functions from 'firebase-functions';
import { AuthService, UserDetails } from '../auth/auth.service';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[AuthService]
})
export class UserComponent implements OnInit {
  prods =[] 
  //p:Observable<Product[]>;
  uid:string='';
  egck: string ="ck_7e788c8aba2774dede3f1b88c8233f5d039d1588";
  eqcs: string = "cs_c72a9d5c316bdddbd46c063aeb9afd5af62fda10";
  equrl: string = "https://uq-shop.cloudaccess.host/";
  userDoc: any;
  data: Object;
  ngForm: FormGroup;
  url:string ="";
  email:string = "";
  cons_key:string="";
  cons_scrt:string="";
  errormsg:string="";
  usereg: FormGroup;
  endpoint:string="/wp-json/wc/v3/products?";
  authState: any = null;
  objuser: userid = {url:"url",uid:"sth"};
  prodCollecton : AngularFirestoreCollection<Details>;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private http: HttpClient, public firestore:AngularFirestore, private af: AngularFireAuth) {
    this.http = http;
    this.af.authState.subscribe(authState=>{
      this.authState = authState;
    });
   }
   /*getProduct(): Observable<companies[]>{
    return this.firestore.collection<companies>('companies').snapshotChanges().pipe(map(changes=> {
      return changes.map(a=>{
         const data = a.payload.doc.data() as companies;
         data.id = a.payload.doc.id;
         return data;
      });
    }));
   }*/
   /*setCollection(email:string){
    this.userDoc = this.firestore.doc('UserDetails' + email);
    console.log('inside setCollection');
   }*/
   
   public addProduct(item: Details, name:string, catName:string, url:string){
     this.userDoc = this.firestore.collection('companies');
     if(this.authService.currUser.uid==null){
       this.errormsg = "Sorry not authenticated!";
     }else{
      this.objuser.uid = this.authService.currUser.uid;
     this.objuser.url = url;
    item.uid = this.objuser;
    console.log(item.uid + "plsplspls");
    this.userDoc.doc('prodDetails').collection('product_categories').doc(catName).collection('products').doc(name).set(item); 
    //this.userDoc =  this.firestore.collection('UserDetails');
   // this.userDoc.doc(this.uid).set(item.uid);
   
   }}
   public userurl(storeurl:any){
     console.log('userurl');
     this.userDoc =  this.firestore.collection('UserDetails');
    if(this.authService.currUser.uid==null){
      this.errormsg = "Sorry not authenticated!";
      console.log(this.errormsg);
    }else{
    this.uid = this.authService.currUser.uid;
    this.email = this.authService.currUser.email;
    console.log(this.uid, this.email);
    console.log(storeurl);
   }
  this.userDoc.doc(this.uid).set({url:storeurl, uid:this.uid});

  }
   categoryColl(arr){
     var n = arr.length;
     this.userDoc = this.firestore.collection('companies');

     for(const item in arr){
      this.userDoc.doc('prodDetails').collection('product_categories').doc(arr[item]).set({any:null});
     }
   }
   
  ngOnInit(): void {
    
    this.usereg = new FormGroup({
      url: new FormControl('', Validators.required),
      cons_key: new FormControl('', Validators.required),
      cons_scrt: new FormControl('', Validators.required),
      
    });
  }
  public onSub(form: any) {
    const formData = new FormData();
    let sitUrl = this.url + this.endpoint + "consumer_key=" +this.cons_key + "&consumer_secret=" + this.cons_scrt;
    console.log(sitUrl)
    const HDRS = {
       'Content-Type': 'application/json'
    };
    return this.authService.user.pipe(take(1), exhaustMap(user=>{
      console.log('inside exhaustmap');
      //this.setCollection(user.email);
      return this.http.get(sitUrl, {headers:HDRS});
      
    }),map(responseData => {
      const obj = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){

        obj.push({...responseData[key], ind:key})
        //this.addProduct(obj[key], obj[key].name);
        var categoryArr = [];
        if(categoryArr.indexOf(obj[key].categories[0].name)==-1){
        categoryArr[key] =obj[key].categories[0].name;
        }
        this.categoryColl(categoryArr);
        //this.userurl(obj[key]._links.collection[0].href);
        this.addProduct(obj[key], obj[key].name, obj[key].categories[0].name, obj[key]._links.collection[0].href);
        this.userurl(obj[key]._links.collection[0].href);
 
        
      }
      }
      this.prods = obj;
      return obj;
      
    })).subscribe(responseData =>
    console.log(responseData),
    (error)=> this.errormsg = "Authentication failed. Please try again"
    );
  
  }
  public userLogout(){
    return this.authService.logout();
  }
  
}
interface Details{
  uid?:userid;
  id:number;
  title?:string;
  stock_quantity:number;
  name:string;
  categories:Object;
  description?:string;
  hasAddons?:boolean;
  maxAddons?:number;
 inStock:boolean;
 price:number;
 

}
interface userid{
  uid?:string;
  url?:string;
}