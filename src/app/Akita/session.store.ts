import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Weather } from '../Weather';

export interface SessionState {
  animVar: boolean;
  secondAnimVar: boolean;
  index: number;
  system: string;
  degreeLetter: string;
  searchValue: string;
  speedSystem: string;
  weatherData: Weather;
}

export function createInitialState(): SessionState {
  return {
    animVar: true,
    secondAnimVar: false,
    index: 0,
    system: 'metric',
    degreeLetter: 'C',
    searchValue: null,
    speedSystem: 'm/s',
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
