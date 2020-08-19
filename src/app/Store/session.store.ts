import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Weather } from '../Weather';

export interface SessionState {
  animVar: boolean;
  secondAnimVar: boolean;
  setVar: boolean;
  index: number;
  degreeLetter: string;
  searchValue: string;
  speedSystem: string;
  system: string;
  weatherData: Weather;
}

export function createInitialState(): SessionState {
  return {
    animVar: true,
    secondAnimVar: false,
    setVar: false,
    index: 0,
    degreeLetter: 'C',
    searchValue: null,
    speedSystem: 'm/s',
    system: 'metric',
    weatherData: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }
}
