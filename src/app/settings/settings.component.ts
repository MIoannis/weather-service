import { Component, OnInit } from '@angular/core';

import { SessionService } from '../Akita/session.service';
import { SessionQuery } from '../Akita/session.query';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  systems: string[] = ['Celsius', 'Fahrenheit', 'Kelvin'];
  formvalue: string;
  index: number;

  constructor(private sessionService: SessionService,
              private sessionQuery: SessionQuery) {
  }

  ngOnInit() {
    this.sessionQuery.index$.subscribe(x => this.index = x);
    this.sessionQuery.formValue$.subscribe(x => this.formvalue = x);
  }

  systemChange(event, i) {
    if (event.value === 'Celsius') {
      this.sessionService.updateSystem('metric', 'C', 'm/s');
      this.sessionService.updateData(this.formvalue, 'metric');
    }

    if (event.value === 'Fahrenheit') {
      this.sessionService.updateSystem('imperial', 'F', 'm/h');
      this.sessionService.updateData(this.formvalue, 'imperial');
    }

    if (event.value === 'Kelvin') {
      this.sessionService.updateSystem('', 'K', 'm/s');
      this.sessionService.updateData(this.formvalue, '');
    }
    this.sessionService.updateIndex(i);
  }

}
