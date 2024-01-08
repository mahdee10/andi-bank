import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from './address';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get<any>("http://127.0.0.1:8000/andi/services/");

  }

  freezeService(s) {
    return this.http.patch("http://127.0.0.1:8000/andi/services/", s, { observe: 'response' });
  }

  getAddresses() {
    return this.http.get<Address[]>("http://127.0.0.1:8000/andi/addresses/");
  }

  getLoans() {
    return this.http.get<Address[]>("http://127.0.0.1:8000/andi/loans/");
  }

  updateLoan(loan, loan_number) {
    return this.http.patch("http://127.0.0.1:8000/andi/loans/" + loan_number, loan);
  }

  getCountries() {
    return this.http.get<Address[]>("http://127.0.0.1:8000/andi/countries/");
  }

  creatAddress(address) {
    return this.http.post("http://127.0.0.1:8000/andi/addresses/", address, { observe: 'response' });
  }

  createCountry(country) {
    return this.http.post("http://127.0.0.1:8000/andi/countries/", country, { observe: 'response' });
  }

  getUser(ssn) {
    return this.http.get<any[]>("http://127.0.0.1:8000/andi/users/" + ssn);
  }
  getLoan(number) {
    return this.http.get<any[]>("http://127.0.0.1:8000/andi/loans/" + number);

  }
  updateUser(ssn, balance) {

    return this.http.patch("http://127.0.0.1:8000/andi/users/" + ssn, balance, { observe: 'response' });
  }

  addAdmin(admin) {
    return this.http.post("http://127.0.0.1:8000/andi/admins/", admin, { observe: 'response' });

  }

  getAdmin() {
    return this.http.get<any[]>("http://127.0.0.1:8000/andi/admins/" + localStorage.getItem("a"));
  }


  getUsers() {
    return this.http.get<any[]>("http://127.0.0.1:8000/andi/users/");

  }

  getTransactions() {
    return this.http.get<any[]>("http://127.0.0.1:8000/andi/transactions/");

  }

}
