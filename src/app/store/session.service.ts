import { Injectable } from '@angular/core';

import { SessionStore } from './session.store';

import { WeatherService } from '../additional/weather.service';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore,
              private weatherService: WeatherService) {
  }

  updateCurrentData(inputValue: string, currentSystem: string) {
    this.weatherService
      .getData(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=${currentSystem}&appid=${this.weatherService.APIkey}`
      ).subscribe(data => this.sessionStore.update({weatherData: data}) );
  }

  updateDailyData(inputValue: string, currentSystem: string) {
    this.weatherService
      .getData(
        `api.openweathermap.org/data/2.5/forecast?q=${inputValue}&units=${currentSystem}&appid=${this.weatherService.APIkey}`
      ).subscribe(data => this.sessionStore.update({weatherData: data}));
  }

  updateSystem(system: string, degreeLetter: string, speedSystem: string) {
    this.sessionStore.update({system, degreeLetter, speedSystem});
  }

  updateIndex(index: number) {
    this.sessionStore.update({index});
  }

  updateAnimationVars(tempAnimation: boolean, tempDataAnimation: boolean) {
    this.sessionStore.update({tempAnimation, tempDataAnimation});
  }

  updateSetVar(setVar: boolean) {
    this.sessionStore.update({setVar});
  }
}
