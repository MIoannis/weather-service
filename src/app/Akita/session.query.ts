import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  getData$ = this.select(store => store.weatherdata);
  currentSystem$ = this.select(store => store.system);
  getIndex$ = this.select(store => store.index);
  getAnimVar$ = this.select(store => store.animvar);
  getSecondAnimVar$ = this.select(store => store.secondanimvar);

  constructor(protected store: SessionStore) {
    super(store);
  }

}
