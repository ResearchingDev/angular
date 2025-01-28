import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  year : number | undefined;

  ngOnInit(): void {
    this.year = new Date().getFullYear()
  }
}
