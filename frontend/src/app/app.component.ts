import { Component, OnInit } from '@angular/core';
import { ToasterPosition } from './common/centerlized/toaster-position.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'datta-able';
  showLayout = true;
  ToasterPosition = ToasterPosition; 
  constructor() {}
  ngOnInit(): void {
  }
}
