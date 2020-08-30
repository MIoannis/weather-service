import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Weather } from '../additional/weather.int';

export interface SessionState {
  tempAnimation: boolean;
  tempDataAnimation: boolean;
  setVar: boolean;
  index: number;
  degreeLetter: string;
  speedSystem: string;
  system: string;
  weatherData: Weather;
  forecastData: any;
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
    forecastData: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }
}
