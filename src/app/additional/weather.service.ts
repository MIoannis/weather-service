import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Weather } from './interfaces/weather.int';
import { CityList } from './interfaces/сity.int';
import {Forecast} from "./interfaces/forecast.int";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  APIkey = '85613b41b1d52401d7954897bc7b0ef8';

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

  getCurrentData(url) {
    return this.http.get<Weather>(url)
      .pipe(catchError(WeatherService.handleError));
  }

  getForecast(url) {
    return this.http.get<Forecast>(url)
      .pipe(catchError(WeatherService.handleError))
  }

  getTowns() {
    return this.http.get<CityList[]>('/assets/city.list.json');
  }
}
