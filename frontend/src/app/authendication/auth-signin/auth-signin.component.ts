import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/authendication.service';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})

export default class AuthSigninComponent {
  constructor(private authService: AuthService) {} 
  ngOnInit(): void {
    // Fetch data on component initialization
    this.authService.getData().subscribe(
      (response) => {
        console.log('API Data:', response);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
