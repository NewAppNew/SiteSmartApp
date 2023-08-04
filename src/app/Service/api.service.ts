import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { User } from './user.model';
import {map,catchError} from 'rxjs/operators'
import { Enquiry } from './enquiry.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // public api_url ="https://velocepro.in/GirnarPhp/api/"
  public api_url=" http://localhost/girnar_backend/api/"; 

  constructor(private http:HttpClient) { }

  register(user:User){
    return this.http.post(`${this.api_url}/register_customer.php`,user);
  }
  registerCompany(user:User){
    console.log('Sign In User: ', user);
    return this.http
      .post(`${this.api_url}/register_company_customer.php`, user)
      .pipe(
        (map(response => response)),
        catchError((error: any) => of(error))
      );
  
  }
  enquiry(enquiry:Enquiry){
    return this.http.post(`${this.api_url}/create_customer_inquiry.php`,enquiry);
  }
  signIn(user): Observable<any> {
    console.log('Sign In User: ', user);
    return this.http
      .post(`${this.api_url}/login_customer.php`, user)
      .pipe(
        (map(response => response)),
        catchError((error: any) => of(error))
      );
  }
}
