import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from './address';
import { Nationality } from './nationality';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(user:any) {
    return this.http.post("http://127.0.0.1:8000/andi/users/", user);
    }

  getAddresses() {
      return this.http.get<Address[]>("http://127.0.0.1:8000/andi/addresses/");
   }

  getNationalities() {
    return this.http.get<Nationality[]>("http://127.0.0.1:8000/andi/countries/");
 }

 login(user:any){
  return this.http.post("http://127.0.0.1:8000/andi/login/", user, { observe: 'response' });
 }

 getUser(ssn) {
  return this.http.get<User[]>("http://127.0.0.1:8000/andi/users/"+ssn);
}

getAdmin(ssn) {
  return this.http.get<User[]>("http://127.0.0.1:8000/andi/admins/"+ssn);
}
 loggedin=null;

 onlogin(ssn){
  this.loggedin=ssn;
  localStorage.setItem("a",this.loggedin);
}
  
}
