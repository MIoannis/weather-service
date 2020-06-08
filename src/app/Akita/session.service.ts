import { Injectable } from '@angular/core';

import { SessionStore } from './session.store';

import { WeatherService } from '../weather.service';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore,
              private weatherapiService: WeatherService) {
  }

  updateData(f: string, c: string) {
    this.weatherapiService
      .getData(`https://api.openweathermap.org/data/2.5/weather?q=${f}&units=${c}&appid=${this.weatherapiService.apikey}`)
      .subscribe(data => this.sessionStore.update({weatherdata: data}));
  }

  updateSystem(system: string) {
    this.sessionStore.update({system});
  }

  updateIndex(index: number) {
    this.sessionStore.update({index});
  }

  updateAnimVar(animvar: boolean, secondanimvar: boolean) {
    this.sessionStore.update({animvar, secondanimvar});
  }

  updateDegreeLetter(degreeletter: string) {
    this.sessionStore.update({degreeletter});
  }

  updateValue(formvalue: string) {
    this.sessionStore.update({formvalue});
  }

}
