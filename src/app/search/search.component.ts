import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from "@angular/forms";
import { animate, state, style, transition, trigger } from '@angular/animations';

import { map, take, tap } from "rxjs/operators";

import { WeatherService } from "../additional/weather.service";

import { SessionService } from '../store/session.service';
import { SessionQuery } from "../store/session.query";

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { CityList } from "../additional/сity.int";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('moveInputUp', [
      state('center', style({
        height: '90%',
      })),
      state('up', style({
        height: '50%',
      })),
      transition('center => up', [
        animate('1s ease-in-out')
      ]),
    ])
  ]
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;

  currentSystem: string;
  inputValue: string;
  keyCities: string[] = [];
  showedCities: string[] = [];

  cities = new Map<string, string[]>();
  filteredCities = new Set<string>();

  constructor(private sessionService: SessionService,
              public sessionQuery: SessionQuery,
              private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getTowns()
      .pipe(
        take(1),
        tap((cities: CityList[]) => {cities.forEach((city: CityList) => {
          this.cities.set(city.name[0], [city.name].concat( this.cities.get(city.name[0]) ));
        });
        })
      ).pipe(
      map((cities: CityList[]) => {
        cities.length = 0;
      })).subscribe();

    this.sessionQuery.currentSystem$.subscribe(x => this.currentSystem = x);
  }

  @Output() showErrorEvent = new EventEmitter<boolean>();
  showError(value: boolean) {
    this.showErrorEvent.emit(value)
  }

  submitCity(form: NgForm) {
    this._update(form.value.search, this.currentSystem);
  }

  _update(searchValue: string, currentSystem: string) {
    this.sessionService.updateCurrentData(searchValue, currentSystem);
    this.sessionService.updateAnimationVars(false, true);
  }

  search(form: NgForm) {
    this.showedCities.length = 0;
    form.valueChanges.pipe(
      take(1), tap(value => {
        if(value.search.length === 1) {
          this.keyCities = this.cities.get(value.search.toUpperCase()).filter(y => y !== undefined);
          while (this.keyCities.length !== 0) {
            this.filteredCities.add( this.keyCities.pop() );
          }
        }
      })
    ).pipe(
      tap(value => {this.filteredCities.forEach(element => {
        if(element.indexOf(value.search[0].toUpperCase() + value.search.slice(1)) !== -1 && value.search.length > 2) {
          if (element.endsWith('’')) {
            this.showedCities.push(element.slice(0, -1))
          } else { this.showedCities.push(element) }
        }
      })
      })
    ).subscribe();
  }
}
