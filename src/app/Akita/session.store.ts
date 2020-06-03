import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SessionState {
   weatherdata: any;
   system: string;
   index: number;
   animvar: boolean;
   secondanimvar: boolean;
}

export function createInitialState(): SessionState {
  return {
    weatherdata: null,
    system: 'metric',
    index: 1,
    animvar: true,
    secondanimvar: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }
}
