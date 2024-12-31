import { Component } from '@angular/core';
import { SidebarComponent } from 'src/app/common/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { FooterComponent } from 'src/app/common/footer/footer.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-client-template',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FooterComponent, AppRoutingModule],
  templateUrl: './client-template.component.html',
  styleUrl: './client-template.component.scss'
})
export class ClientTemplateComponent {

}
