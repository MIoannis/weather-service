import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore) {
  }

  updateData(weatherdata: any) {
    this.sessionStore.update({weatherdata});
  }

}
