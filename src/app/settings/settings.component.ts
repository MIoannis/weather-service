import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  systems: string[] = ['Fahrenheit', 'Celsius', 'Kelvin'];

  constructor() { }

  ngOnInit(): void {
  }

}
