import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';
import { WeatherapiService } from '../weatherapi.service';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore,
              private weatherapiService: WeatherapiService ) {
  }

  updateData(f) {
  return this.weatherapiService
    .getApiData(`https://api.openweathermap.org/data/2.5/weather?q=${f}&units=metric&appid=${this.weatherapiService.apikey}`)
    .subscribe(data => this.sessionStore.update({weatherdata: data}));
  }

}
