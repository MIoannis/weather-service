import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Weather } from '../Weather';

export interface SessionState {
  animvar: boolean;
  secondanimvar: boolean;
  index: number;
  system: string;
  degreeletter: string;
  formvalue: string;
  speedsystem: string;
  weatherdata: Weather;
}

export function createInitialState(): SessionState {
  return {
    animvar: true,
    secondanimvar: false,
    index: 0,
    system: 'metric',
    degreeletter: 'C',
    formvalue: null,
    speedsystem: 'm/s',
    weatherdata: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }
}
