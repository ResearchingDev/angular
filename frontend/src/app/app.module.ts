// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
// project import
import { AppComponent } from './app.component';
import { AuthService } from './services/authendication.service';
import { NavigationEnd, Router } from '@angular/router';
import { event } from 'jquery';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    DataTablesModule
  ],
  // providers: [NavigationItem],
  bootstrap: [AppComponent]
})
export class AppModule {
  currentUrl: string | undefined;
  value: number | undefined;
  constructor(public AuthService:AuthService,public router:Router){
    this.router.events.subscribe(events=>{
      if(events instanceof NavigationEnd){
        this.currentUrl=events.url;
        this.value = this.AuthService.isLogin();
        if(this.value==0)
          this.router.navigate(['auth/signin']);
        else if(this.value==1 && (this.currentUrl == "/auth/signin" || this.currentUrl == "/auth/signup"))
          this.router.navigate(['dashboard']);
      }
    });
  }
}
