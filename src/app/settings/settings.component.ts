import { Component, OnInit } from '@angular/core';

import { SessionService } from '../store/session.service';
import { SessionQuery } from '../store/session.query';

import {Weather} from "../additional/interfaces/weather.int";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  systems: string[] = ['Celsius', 'Fahrenheit', 'Kelvin'];
  data: Weather;
  index: number;

  constructor(private sessionService: SessionService,
              private sessionQuery: SessionQuery) { }

  ngOnInit() {
    this.sessionQuery.index$.subscribe(x => this.index = x);
    this.sessionQuery.weatherData$.subscribe(x => this.data = x)
  }

  systemChange(event, i) {
    if (event.value === 'Celsius') {
      this.sessionService.updateSystem('metric', 'C', 'm/s');
      this.sessionService.updateCurrentData(this.data.name, 'metric');
      this.sessionService.updateDailyData(this.data.name, 'metric');
    }

    if (event.value === 'Fahrenheit') {
      this.sessionService.updateSystem('imperial', 'F', 'm/h');
      this.sessionService.updateCurrentData(this.data.name, 'imperial');
      this.sessionService.updateDailyData(this.data.name, 'imperial')
    }

    if (event.value === 'Kelvin') {
      this.sessionService.updateSystem('', 'K', 'm/s');
      this.sessionService.updateCurrentData(this.data.name, '');
      this.sessionService.updateDailyData(this.data.name, '')
    }
    this.sessionService.updateIndex(i);
  }
}
