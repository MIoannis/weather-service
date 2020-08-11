import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  weatherData$ = this.select(store => store.weatherData);
  currentSystem$ = this.select(store => store.system);
  index$ = this.select(store => store.index);
  animVar$ = this.select(store => store.animVar);
  setVar$ = this.select(store => store.setVar);
  secondAnimVar$ = this.select(store => store.secondAnimVar);
  degreeLetter$ = this.select(store => store.degreeLetter);
  searchValue$ = this.select(store => store.searchValue);
  speedSystem$ = this.select(store => store.speedSystem);

  constructor(protected store: SessionStore) {
    super(store);
  }
}
