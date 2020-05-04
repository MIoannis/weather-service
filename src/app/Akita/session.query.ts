import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  getTown$ = this.select(store => store.town);
  getData$ = this.select(store => store.data);

  constructor(protected store: SessionStore) {
    super(store);
  }

}
