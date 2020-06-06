import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Weather } from '../WeatherInt';

export interface SessionState {
   weatherdata: Weather;
   system: string;
   index: number;
   animvar: boolean;
   secondanimvar: boolean;
   degreeletter: string;
   formvalue: string;
}

export function createInitialState(): SessionState {
  return {
    weatherdata: null,
    system: 'metric',
    index: 1,
    animvar: true,
    secondanimvar: false,
    degreeletter: 'C',
    formvalue: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }
}
