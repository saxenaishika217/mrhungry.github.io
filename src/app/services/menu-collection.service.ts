import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MenuCollectionService {

  url="http://localhost:3000/getmenus_collection"
  constructor(private http:HttpClient) { }
  menu_collection(){
    return this.http.get(this.url)
  }
}
