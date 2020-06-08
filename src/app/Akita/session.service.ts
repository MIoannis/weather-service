import { Injectable } from '@angular/core';

import { SessionStore } from './session.store';

import { WeatherService } from '../weather.service';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore,
              private weatherapiService: WeatherService) {
  }

  updateData(formvalue: string, currentsystem: string) {
    this.weatherapiService
      .getData(`https://api.openweathermap.org/data/2.5/weather?q=${formvalue}&units=${currentsystem}&appid=${this.weatherapiService.apikey}`)
      .subscribe(data => this.sessionStore.update( {weatherdata: data}) );
  }

  updateSystem(system: string, degreeletter: string, speedsystem: string) {
    this.sessionStore.update({system, degreeletter, speedsystem});
  }

  updateIndex(index: number) {
    this.sessionStore.update({index});
  }

  updateAnimVar(animvar: boolean, secondanimvar: boolean) {
    this.sessionStore.update({animvar, secondanimvar});
  }

  updateValue(formvalue: string) {
    this.sessionStore.update({formvalue});
  }

}
