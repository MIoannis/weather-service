import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { WeatherService } from '../weather.service';

import { SessionService } from '../Akita/session.service';
import { SessionQuery } from '../Akita/session.query';

import { Subscription } from 'rxjs';
import { tap, take, map } from 'rxjs/operators';

import { CityList } from '../CityList';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
  animations: [
    trigger('moveUp', [
      state('center', style({
        height: '90%',
      })),
      state('up', style({
        height: '40%',
      })),
      transition('center => up', [
        animate('1s ease-in-out')
      ]),
    ]),
    trigger('changeOpacity', [
      state('zero', style({
        opacity: 0
      })),
      state('full', style({
        opacity: 1
      })),
      transition('zero => full', [
        animate('1.5s')
      ]),
    ]),
    trigger('insertTrigger', [
      transition(':enter', [
        style({top: '125%'}),
        animate('1s ease-in-out', style({ left: '25%', top: '50%' })),
      ]),
    ])
  ]
})
export class MainpageComponent implements OnInit {
  private fvar: Subscription;
  private svar: Subscription;

  animVar: boolean;
  secondAnimVar: boolean;
  degreeLetter: string;
  currentSystem: string;
  formValue: string;
  speedSystem: string;
  cities = new Map<string, string[]>();
  filtredCities: string[] = [];

  constructor(private sessionService: SessionService,
              private weatherService: WeatherService,
              public sessionQuery: SessionQuery) {
  }

  ngOnInit() {
    this.fvar = this.sessionQuery.animVar$.subscribe(x => this.animVar = x);
    this.svar = this.sessionQuery.secondAnimVar$.subscribe(x => this.secondAnimVar = x);

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

    this.sessionQuery.searchValue$.subscribe(x => this.formValue = x);
    this.sessionQuery.currentSystem$.subscribe(x => this.currentSystem = x);
    this.sessionQuery.degreeLetter$.subscribe(x => this.degreeLetter = x);
    this.sessionQuery.speedSystem$.subscribe(x => this.speedSystem = x);
  }

  submitCity(form: NgForm) {
    this._update(form.value.search, this.currentSystem);
    this.fvar.unsubscribe();
    this.svar.unsubscribe();
  }

  _update(searchValue: string, currentSystem: string) {
    this.sessionService.updateData(searchValue, currentSystem);
    this.sessionService.updateValue(searchValue);
    this.sessionService.updateAnimVar(false, true);
  }

  search(form: NgForm) {
    form.valueChanges.pipe(take(1)).subscribe(letter => this.filtredCities = this.cities.get(letter));
  }

}
