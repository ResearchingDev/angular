import { Component } from '@angular/core';
import { SidebarComponent } from 'src/app/common/sidebar/sidebar.component';
import { FooterComponent } from 'src/app/common/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavigationItem } from 'src/app/common/sidebar/navigation/navigation';
import { NavBarComponent } from "../../common/sidebar/nav-bar/nav-bar.component";

@Component({
  selector: 'app-client-template',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, RouterModule, NavBarComponent],
  templateUrl: './client-template.component.html',
  styleUrl: './client-template.component.scss',
  providers: [NavigationItem],
})
export class ClientTemplateComponent {
  constructor() {}
}
