import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  weatherData$ = this.select(store => store.weatherdata);
  currentSystem$ = this.select(store => store.system);
  currentIndex$ = this.select(store => store.index);
  animVar$ = this.select(store => store.animvar);
  secondAnimVar$ = this.select(store => store.secondanimvar);
  degreeLetter$ = this.select(store => store.degreeletter);
  formValue$ = this.select(store => store.formvalue);

  constructor(protected store: SessionStore) {
    super(store);
  }

}
