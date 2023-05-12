import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  paymentHandler: any = null;
  Cart: any;
  totalprice: number = 0;
  LoggedUser: any;
  user: any;
  constructor(private router: Router, private _http: HttpClient) {
    this.LoggedUser = JSON.parse(localStorage.getItem('USER')!);
    this.user = this.LoggedUser._id;
    this.Cart = JSON.parse(localStorage.getItem('CART')!);
    for (let i = 0; i < this.Cart.length; i++) {
      this.totalprice =
        this.totalprice + this.Cart[i].quantity * this.Cart[i].price;
    }
  }

  ngOnInit() {
    this.invokeStripe();
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51M4UFTSItqCvdCImS0Dbg6UdkxluL8HuaiZkiqCdVYMPssYVq1bc69aFTRmqm94OixArVrO0u8OLetJq3IT6RM2I000XZOftP5',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);

        alert('Payment Successfull');
        //localStorage.removeItem('CartCount');
      },
    });
    paymentHandler.open({
      name: 'Mr HUNGRY',
      // description: '3 widgets',
      amount: amount * 100,
    });
    debugger;
    this._http
      .post<any>('http://localhost:3000/addorder', {
        order: this.Cart,
        totalprice: this.totalprice,
        user: this.user,
      })
      .subscribe(
        (res) => {
          //alert(res.msg);
          console.log(res);
          setTimeout(() => {
            this.router.navigate(['orderhistory']);
          }, 10000);
        },
        (err) => {
          //alert(err.error.msg);
          console.log(err);
        }
      );
    // localStorage.removeItem('CART');
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51M4UFTSItqCvdCImS0Dbg6UdkxluL8HuaiZkiqCdVYMPssYVq1bc69aFTRmqm94OixArVrO0u8OLetJq3IT6RM2I000XZOftP5',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
