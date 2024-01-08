import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { AuthService } from '../authentication/auth.service';
import { Address } from '../authentication/address';
import { Nationality } from '../authentication/nationality';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }



  user_ssn: number;

  change(user_ssn) {
    this.user_ssn = user_ssn;
  }
  getUser() {
    return this.http.get<User[]>("http://127.0.0.1:8000/andi/users/" + localStorage.getItem("a"));
  }

  getTransaction() {
    return this.http.get<User[]>("http://127.0.0.1:8000/andi/user-transactions/" + localStorage.getItem("a"));
  }
  getDebit() {
    return this.http.get<User[]>("http://127.0.0.1:8000/andi/user-debit-cards/" + localStorage.getItem("a"));
  }
  createTransaction(transaction) {
    return this.http.post("http://127.0.0.1:8000/andi/transactions/", transaction, { observe: 'response' });
  }

  updateUser(ssn, balance) {
    return this.http.patch("http://127.0.0.1:8000/andi/users/" + ssn, balance, { observe: 'response' });
  }

  getReceiver(ssn) {
    return this.http.get<User[]>("http://127.0.0.1:8000/andi/users/" + ssn);
  }

  createDebit(debit) {
    return this.http.post("http://127.0.0.1:8000/andi/debit-cards/", debit, { observe: 'response' });
  }
  createLoan(loan) {
    return this.http.post("http://127.0.0.1:8000/andi/loans/", loan, { observe: 'response' });
  }
  createPredict(predict) {
    return this.http.post("http://127.0.0.1:8000/andi/predict/", predict, { observe: 'response' });
  }
  createService(service) {
    return this.http.post("http://127.0.0.1:8000/andi/asks/", service, { observe: 'response' });
  }

  getAddresses() {
    return this.http.get<Address[]>("http://127.0.0.1:8000/andi/addresses/");
  }

  getNationalities() {
    return this.http.get<Nationality[]>("http://127.0.0.1:8000/andi/countries/");
  }

  getLoan() {
    return this.http.get<User[]>("http://127.0.0.1:8000/andi/user-loans/" + localStorage.getItem("a"));
  }

  getFeatures(feature) {
    return this.http.get<any>("http://127.0.0.1:8000/andi/features/" + feature);
  }

  getServices() {
    return this.http.get<any>("http://127.0.0.1:8000/andi/services/");
  }


  updateService(service) {
    return this.http.patch("http://127.0.0.1:8000/andi/services/", service, { observe: 'response' });
  }
}
