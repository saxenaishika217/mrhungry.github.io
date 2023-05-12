import { Component, OnInit } from '@angular/core';
import {UsersDataService} from '../services/users-data.service'
import {MenuCollectionService} from '../services/menu-collection.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
submenu:any;
collection:any;
CurrentUser: boolean=false;
UserName:any;
  LoggedUser: any;
  constructor(private userData:UsersDataService, private menucollection:MenuCollectionService ) {
    this.userData.users().subscribe((submenudata)=>{
      this.submenu=submenudata
      console.log("data",this.submenu);
      
    });
  
    this.LoggedUser = JSON.parse(localStorage.getItem("USER")!);

    if(this.LoggedUser!=null){ 
      this.CurrentUser=true;
      this.UserName=this.LoggedUser.name;
      console.log(this.LoggedUser.name);
    }
    else{
      this.CurrentUser=false;
    }
    this.menucollection.menu_collection().subscribe((data)=>{
      this.collection= data;
      console.log(this.collection);
    })
   }

  ngOnInit(): void {
    
  }

}



