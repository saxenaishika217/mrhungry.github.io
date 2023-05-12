import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../services/orders.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.scss'],
})
export class OrderhistoryComponent implements OnInit {
  collection: any;
  LoggedUser: any;
  constructor(
    private _http: HttpClient,
    private route: ActivatedRoute,
    private orders: OrderService
  ) { 
    debugger
    this.LoggedUser = JSON.parse(localStorage.getItem("USER")!);

    this.orders.orders(this.LoggedUser._id).subscribe((data) => {
    this.collection = data;
    console.log(this.collection);
    
  });
  
}

  ngOnInit(): void { const id = this.route.snapshot.params['id']}
}
