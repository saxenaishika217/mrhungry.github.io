import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  Cart: any;
  x:any;
  totalprice: number=0;
  checkoutForm!: FormGroup;
  LoggedUser: any;
  constructor(private router:Router,  private formbuilder: FormBuilder,private _http: HttpClient) {
    this.LoggedUser = JSON.parse(localStorage.getItem("USER")!);
    this.Cart = this.LoggedUser.cart
    for(let i=0; i< this.Cart.length; i++){
      this.totalprice= this.totalprice + (this.Cart[i].quantity * this.Cart[i].price);
    }
    //console.log(this.totalprice)
   }

  ngOnInit(): void {
    this.checkoutForm = this.formbuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
     username: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      address: ['', Validators.required],
   
    }    );
  }

  checkout(){
  if(this.checkoutForm.valid){
    debugger
    localStorage.setItem('CART', JSON.stringify(this.Cart));
    if(this.checkoutForm.valid ){
      this._http
        .post<any>('http://localhost:3000/addaddress', this.checkoutForm.value)
        .subscribe( res => {
            // alert('Registration SuccessFull');
            this.checkoutForm.reset();
            this.router.navigate(['payment']);
          },
          
        )
      }
      else{
        alert("Enter all required fields");
  
      }
    
  }

  else{
this.launch_toast();
  }
};
launch_toast() {
    this.x = document.getElementById("toast")
    this.x.className = "show";
    setTimeout(()=>{this.x.className = this.x.className.replace("show", "");}, 5000);
    // alert("done")
  }
}

