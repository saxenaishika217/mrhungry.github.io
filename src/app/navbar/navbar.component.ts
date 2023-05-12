import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  CurrentUser: boolean=false;
UserName:any;
  LoggedUser: any;
  x: any;
  cartcount: any;
  LoggedUser_id: any;
  constructor(private router: Router) { 
    this.LoggedUser = JSON.parse(localStorage.getItem("USER")!);
   
this.cartcount=JSON.parse(localStorage.getItem("CartCount")!);
    if(this.LoggedUser!=null){ 
      this.CurrentUser=true;
      this.UserName=this.LoggedUser.name;
      this.LoggedUser_id=this.LoggedUser._id;
      this.cartcount=(this.LoggedUser.cart.length);
      console.log(this.LoggedUser.name);
      console.log(this.LoggedUser.cart.length);

    }
    else{
      this.CurrentUser=false;
    }
  }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem("USER");
    localStorage.removeItem("CART");
    localStorage.removeItem("CartCount");
    this.CurrentUser=false;
    this.UserName=null;

    this.router.navigate(['home']);
    this.launch_toast();
  }
  launch_toast() {
    this.x = document.getElementById("toast")
    this.x.className = "show";
    setTimeout(()=>{this.x.className = this.x.className.replace("show", "");}, 5000);
    // alert("done")
  }
}
