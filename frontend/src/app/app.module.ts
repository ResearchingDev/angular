// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';

import { NavBarComponent } from './common/sidebar/nav-bar/nav-bar.component';
import { NavigationComponent } from './common/sidebar/navigation/navigation.component';
import { NavLeftComponent } from './common/sidebar/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './common/sidebar/nav-bar/nav-right/nav-right.component';
import { NavContentComponent } from './common/sidebar/navigation/nav-content/nav-content.component';
import { NavLogoComponent } from './common/sidebar/navigation/nav-logo/nav-logo.component';
import { NavCollapseComponent } from './common/sidebar/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './common/sidebar/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './common/sidebar/navigation/nav-content/nav-item/nav-item.component';
import { NavSearchComponent } from './common/sidebar/nav-bar/nav-left/nav-search/nav-search.component';
import { NavigationItem } from './common/sidebar/navigation/navigation';

// project import
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NavBarComponent,
    NavigationComponent,
    NavLeftComponent,
    NavRightComponent,
    NavContentComponent,
    NavLogoComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    NavSearchComponent,
    NavigationItem,
    HttpClientModule
  ],
  providers: [NavigationItem],
  bootstrap: [AppComponent]
})
export class AppModule {}
