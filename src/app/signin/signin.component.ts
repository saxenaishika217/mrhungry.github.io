import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  email: any;
  password: any;
  toastMsg: any;
x:any;
  signinForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
        });
  }
  login() {
  
    this._http
      .post<any>('http://localhost:3000/login', { email: this.signinForm.value.email, password: this.signinForm.value.password }
      )
      .subscribe(
        (res) => {
          //alert(res.msg);
           console.log(res);
           this.toastMsg=res.msg;
           this.launch_toast();
         //var userlocal=JSON.stringify(res)
          localStorage.setItem("USER", JSON.stringify(res.user));
         
          this.router.navigate(['home']);
        },
        (err) => {
          this.toastMsg=err.error.msg;
           this.launch_toast();
          //alert(err.error.msg);
          //console.log(err);
        }
      );
  }

  launch_toast() {
    this.x = document.getElementById("toast")
    this.x.className = "show";
    setTimeout(()=>{this.x.className = this.x.className.replace("show", "");}, 5000);
    // alert("done")
  }
}
