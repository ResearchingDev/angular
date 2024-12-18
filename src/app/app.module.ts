import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './client/home/home.component';
import { ReportComponent } from './client/report/report.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,FormsModule 
    // AppRoutingModule,
  ],
  bootstrap:[AppComponent]
})
export class AppModule { }
