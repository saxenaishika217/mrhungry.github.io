import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { MenuCollectionService } from '../services/menu-collection.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-menuitems',
  templateUrl: './menuitems.component.html',
  styleUrls: ['./menuitems.component.scss'],
})
export class MenuitemsComponent implements OnInit {
  submenu: any;
  cartvalue: any;
  totalquantity: number = 0;
  collection: any;
  x: any;
  menutoastmsg: any;
  //quantity=[];
  //quantity=0;
  id: any;
  LoggedUser: any;
  user_id: any;
  constructor(
    private userData: UsersDataService,
    private _http: HttpClient,
    private menucollection: MenuCollectionService,
    private _Activatedroute: ActivatedRoute
  ) {
    this.userData.users().subscribe((submenudata) => {
      this.submenu = submenudata;

      this.submenu = this.submenu.map((e: any) => {
        return {
          ...e,
          quantity: 0,
        };
      });

      console.log('data 111', this.submenu);
    });
    this.menucollection.menu_collection().subscribe((data) => {
      this.collection = data;
      console.log(this.collection);
    });
    this.LoggedUser = JSON.parse(localStorage.getItem('USER')!);
    this.user_id = this.LoggedUser._id;
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log(this.id);
      const param = new HttpParams().set('ID', this.user_id);
    });
  }
  //   launch_toast() {
  //     debugger
  //     this.x = document.getElementById("toast")
  //     this.x.className = "show";
  //     setTimeout(this.x.className = this.x.className.replace("show", ""), 1000000);
  //     alert("done")
  // }
  launch_toast() {
    this.x = document.getElementById('toast');
    this.x.className = 'show';
    setTimeout(() => {
      this.x.className = this.x.className.replace('show', '');
    }, 5000);
    // alert("done")
  }
  minus(id: string) {
    debugger;
    this.submenu.map((e: any) => {
      if (e._id == id) {
        if (e.quantity > 0) {
          e.quantity = e.quantity - 1;
        }
      }
    });
    //console.log(id);
    //this.quantity=this.quantity-1;
  }
  add(id: string) {
    debugger;
    this.submenu.map((e: any) => {
      if (e._id == id) {
        e.quantity = e.quantity + 1;
      }
    });
    //this.quantity=this.quantity+1;
  }
  Addcart() {
    debugger;
    this.cartvalue = this.submenu.filter((e: any) => {
      if (e.quantity > 0) {
        this.totalquantity = this.totalquantity + e.quantity;
        return e;
      }
    });

    if (this.totalquantity >= 0) {
      this._http
        .post<any>(
          'http://localhost:3000/updateCart/' + this.user_id,
          this.cartvalue
        )
        .subscribe(
          (res) => {
            //alert(res.msg);
            console.log(res);
            localStorage.setItem('USER', JSON.stringify(res));
          },
          (err) => {
            //alert(err.error.msg);
            console.log(err);
          }
        );
      //localStorage.setItem('CART', JSON.stringify(this.cartvalue));
      //localStorage.setItem('CartCount', JSON.stringify(this.totalquantity));
      this.menutoastmsg = 'Hurray!! Item added Successfully!!';

      this.launch_toast();
    } else {
      this.menutoastmsg = 'Oops!!Add items to proceed';
      this.launch_toast();
    }
    // console.log("cart v:"+this.cartvalue);
   
  }

}
