import { Component, OnInit } from '@angular/core';
import { SessionService } from '../Akita/session.service';
import { SessionQuery } from '../Akita/session.query';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{
  systems: string[] = ['Fahrenheit', 'Celsius', 'Kelvin'];
  systemsindex: number;

  constructor(private sessionService: SessionService,
              private sessionQuery: SessionQuery) {
  }

  ngOnInit() {
    this.sessionQuery.getIndex$.subscribe(x => this.systemsindex = x);
  }

  systemChange(event, i) {
    if (event.value === 'Fahrenheit') {
      this.sessionService.updateSystem('imperial');
    }

    if (event.value === 'Celsius') {
      this.sessionService.updateSystem('metric');
    }

    if (event.value === 'Kelvin') {
      this.sessionService.updateSystem('');
    }
    this.sessionService.updateIndex(i);
  }

}
