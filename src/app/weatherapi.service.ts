import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {
  apikey = '85613b41b1d52401d7954897bc7b0ef8';
  constructor(private http: HttpClient) { }

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

  getApiData(url) {
    return  this.http.get(url)
      .pipe(catchError(this.handleError));
  }
}
