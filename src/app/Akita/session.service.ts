import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore) {
  }

  updateData(data: string) {
    this.sessionStore.update({data});
  }

  updateTown(town: string) {
    this.sessionStore.update({town});
  }
}
