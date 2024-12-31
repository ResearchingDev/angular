import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'datta-able';
  showLayout = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to route changes
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Hide layout on login page
        this.showLayout = event.url !== '/auth/signin';
      }
    });
  }
}
