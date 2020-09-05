import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Weather } from '../additional/interfaces/weather.int';
import { Forecast } from "../additional/interfaces/forecast.int";

export interface SessionState {
  tempAnimation: boolean;
  tempDataAnimation: boolean;
  setVar: boolean;
  index: number;
  degreeLetter: string;
  speedSystem: string;
  system: string;
  weatherData: Weather;
  forecastData: Forecast;
  forecastTime: number;
}

export function createInitialState(): SessionState {
  return {
    tempAnimation: true,
    tempDataAnimation: false,
    setVar: false,
    index: 0,
    degreeLetter: 'C',
    speedSystem: 'm/s',
    system: 'metric',
    weatherData: null,
    forecastData: null,
    forecastTime: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }
}
