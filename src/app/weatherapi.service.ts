import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Weather } from './WeatherInt';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {
  apikey = '85613b41b1d52401d7954897bc7b0ef8';
  constructor(private http: HttpClient) { }

  static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(
        `Error status ${error.status}`
      );
    }
    return throwError(error);
  }

  getApiData(url) {
    return this.http.get<Weather>(url)
      .pipe(catchError(WeatherapiService.handleError));
  }
}
