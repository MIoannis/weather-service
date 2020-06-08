import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { WeatherService } from '../weather.service';

import { SessionService } from '../Akita/session.service';
import { SessionQuery } from '../Akita/session.query';

import { Subscription } from 'rxjs';
import { tap, take} from 'rxjs/operators';

import { CityList } from '../CityList';
import { Weather } from '../Weather';

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

  degreeletter: string;
  currentsys: string;
  formvalue: string;
  cities: string[] = [];
  animVar: boolean;
  secondAnimVar: boolean;
  weatherdata: Weather;

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
        tap((towns: CityList[]) => {towns.forEach((town: CityList) => {this.cities.push(town.name);
        });
        })
      ).subscribe();

    this.sessionQuery.formValue$.subscribe(x => this.formvalue = x);
    this.sessionQuery.currentSystem$.subscribe(x => this.currentsys = x);
    this.sessionQuery.degreeLetter$.subscribe(x => this.degreeletter = x);
  }

  chooseTown(f: NgForm) {
    this.sessionService.updateData(f.value.town, this.currentsys);
    this.sessionService.updateValue(f.value.town);
    this.sessionService.updateAnimVar(false, true);
    this.fvar.unsubscribe();
    this.svar.unsubscribe();;
  }

}
