import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
  })
 

  export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }

    constructor(
      public router: Router
      ){}
  ngOnInit(): void {
      
    
  }
    
  
  
   
    clickEvent(){
     
      this.router.navigateByUrl("/signin");
    }
    // onsignin(){
    //   console.log("click")
    //     this.router.navigateByUrl("/signin");
    //     // this.router.navigateByUrl("/getstarted");
    //   }
    
  }