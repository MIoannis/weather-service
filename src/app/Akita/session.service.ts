import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {observable, Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore,
              private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(
        `Error status ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }


  getData(url) {
    return  this.http.get(url)
      .pipe(catchError(this.handleError));
  }
}
