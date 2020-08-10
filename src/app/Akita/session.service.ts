import { Injectable } from '@angular/core';

import { SessionStore } from './session.store';

import { WeatherService } from '../weather.service';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore,
              private weatherapiService: WeatherService) {
  }

  updateData(formValue: string, currentSystem: string) {
    this.weatherapiService
      .getData(
        `https://api.openweathermap.org/data/2.5/weather?q=${formValue}&units=${currentSystem}&appid=${this.weatherapiService.apikey}`
      ).subscribe(data => this.sessionStore.update({weatherData: data}) );
  }

  updateSystem(system: string, degreeLetter: string, speedSystem: string) {
    this.sessionStore.update({system, degreeLetter, speedSystem});
  }

  updateIndex(index: number) {
    this.sessionStore.update({index});
  }

  updateAnimVar(animVar: boolean, secondAnimVar: boolean) {
    this.sessionStore.update({animVar, secondAnimVar});
  }

  updateValue(searchValue: string) {
    this.sessionStore.update({searchValue});
  }
}
