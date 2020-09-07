import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { SessionQuery } from '../store/session.query';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
  animations: [
    trigger('showTemp', [
      state('zero', style({
        opacity: 0
      })),
      state('full', style({
        opacity: 1
      })),
      transition('zero => full', [
        animate('0.8s')
      ]),
    ]),
    trigger('insertTempData', [
      transition(':enter', [
        style({top: '125%'}),
        animate('1s ease', style({ left: '20%', top: '67%' })),
      ]),
    ]),
    trigger( 'insertSideSettings', [
      transition(':enter', [
        style({right: '-25%'}),
        animate('.8s ease', style({ right: '0%' })),
      ]),
      transition(':leave', [
        style({right: '0%'}),
        animate('1s ease', style({ right: '-20%' })),
      ]),
    ]),
  ]
})
export class MainpageComponent implements OnInit {
  tempAnimation: boolean;
  tempDataAnimation: boolean;
  setVar: boolean;
  checkData = false;
  time = false;

  translateXValue = 0;
  positiveButton = true;
  negativeButton = false;

  degreeLetter: string;
  speedSystem: string;

  cities = new Map<string, string[]>();
  filteredCities = new Set<string>();

  constructor(public sessionQuery: SessionQuery) { }

  ngOnInit() {
    this.sessionQuery.tempAnimation$.subscribe(x => this.tempAnimation = x);
    this.sessionQuery.tempDataAnimation$.subscribe(x => this.tempDataAnimation = x);
    this.sessionQuery.degreeLetter$.subscribe(x => this.degreeLetter = x);
    this.sessionQuery.speedSystem$.subscribe(x => this.speedSystem = x);
    this.sessionQuery.setVar$.subscribe(x => this.setVar = x);
  }

  showError(value) {
    setTimeout(() => this.checkData = value, 5000);
  }

  changeTranslateValuePositive() {
    this.translateXValue += 30;
    if (this.translateXValue === 0) {
      this.positiveButton = true;
      this.negativeButton = false;
    }

    if (this.translateXValue < 0) {
      this.positiveButton = true;
      this.negativeButton = true;
    }
  }

  changeTranslateValueNegative() {
    this.translateXValue -= 30;
    if (this.translateXValue === -360) {
      this.positiveButton = false;
      this.negativeButton = true;
    }

    if (this.translateXValue > -360) {
      this.positiveButton = true;
      this.negativeButton = true;
    }
  }
}
