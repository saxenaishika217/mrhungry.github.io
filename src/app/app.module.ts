import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { FeedbackpageComponent } from './feedbackpage/feedbackpage.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MenuitemsComponent } from './menuitems/menuitems.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';

@NgModule({
  declarations: [AppComponent, SignupComponent, SigninComponent, ForgetpasswordComponent, FeedbackpageComponent, HomeComponent, NavbarComponent, MenuitemsComponent, CheckoutComponent, PaymentComponent, OrderhistoryComponent],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule, NgbModule,AgmCoreModule.forRoot({
    apiKey:'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'
  })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
