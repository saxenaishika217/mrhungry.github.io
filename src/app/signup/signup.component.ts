import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  x:any;
  constructor(
    private formbuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
    }    );
    
  }
  
  signUp() {
    debugger
    if(this.signupForm.valid ){
    this._http
      .post<any>('http://localhost:3000/register', this.signupForm.value)
      .subscribe( res => {
          alert('Registration SuccessFull');
          this.signupForm.reset();
          this.router.navigate(['sign-in']);
        },
        err => {
          alert('User Already exist');
          this.router.navigate(['sign-in']);
        }
      )
    }
    else{
      alert("Enter all required fields");

    }
  }
 
}
