import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  weatherData$ = this.select(store => store.weatherData);
  currentSystem$ = this.select(store => store.system);
  index$ = this.select(store => store.index);
  tempAnimation$ = this.select(store => store.tempAnimation);
  setVar$ = this.select(store => store.setVar);
  tempDataAnimation$ = this.select(store => store.tempDataAnimation);
  degreeLetter$ = this.select(store => store.degreeLetter);
  speedSystem$ = this.select(store => store.speedSystem);

  constructor(protected store: SessionStore) {
    super(store);
  }
}
