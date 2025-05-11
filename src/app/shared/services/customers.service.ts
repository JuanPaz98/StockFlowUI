import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private URL = 'http://localhost:5051/api/v1/customers';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.URL);
  }
}
