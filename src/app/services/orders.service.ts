import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url="http://localhost:3000/getorderbyid/"
  constructor(private http:HttpClient) { }
  orders(_id: any){
    return this.http.get(this.url + _id)
  }
  
}
