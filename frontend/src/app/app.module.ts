// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// project import
import { AppComponent } from './app.component';
import { NavCollapseComponent } from './common/sidebar/navigation/nav-content/nav-collapse/nav-collapse.component';

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
  ],
  // providers: [NavigationItem],
  bootstrap: [AppComponent]
})
export class AppModule {}
