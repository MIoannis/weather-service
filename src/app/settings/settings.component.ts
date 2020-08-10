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
  formValue: string;
  index: number;

  constructor(private sessionService: SessionService,
              private sessionQuery: SessionQuery) {
  }

  ngOnInit() {
    this.sessionQuery.index$.subscribe(x => this.index = x);
    this.sessionQuery.searchValue$.subscribe(x => this.formValue = x);
  }

  systemChange(event, i) {
    if (event.value === 'Celsius') {
      this.sessionService.updateSystem('metric', 'C', 'm/s');
      this.sessionService.updateData(this.formValue, 'metric');
    }

    if (event.value === 'Fahrenheit') {
      this.sessionService.updateSystem('imperial', 'F', 'm/h');
      this.sessionService.updateData(this.formValue, 'imperial');
    }

    if (event.value === 'Kelvin') {
      this.sessionService.updateSystem('', 'K', 'm/s');
      this.sessionService.updateData(this.formValue, '');
    }
    this.sessionService.updateIndex(i);
  }
}
