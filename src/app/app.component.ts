import {Component} from '@angular/core';
import {SessionService} from './Akita/session.service';
import {SessionQuery} from './Akita/session.query';
import {NgForm} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
        animate('1.2s')
      ]),
    ]),
    trigger('insertTrigger', [
      transition(':enter', [
        style({top: '125%'}),
        animate('1s ease-in-out', style({ left: '30%', top: '50%' })),
      ]),
    ])
  ]
})
export class AppComponent {
  animVar = true;
  secondAnimVar = false;
  weatherdata: any;

  constructor(private sessionService: SessionService,
              public sessionQuery: SessionQuery) {
  }

  chooseTown(f: NgForm) {
    this.sessionService.updateData(f.value.town);
    this.animVar = false;
    this.secondAnimVar = true;
  }
}
