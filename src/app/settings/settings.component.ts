import { Component, OnInit } from '@angular/core';
import { SessionService } from '../Akita/session.service';
import { SessionQuery } from '../Akita/session.query';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  systems: string[] = ['Fahrenheit', 'Celsius', 'Kelvin'];
  formvalue: string;
  systemsindex: number;

  constructor(private sessionService: SessionService,
              private sessionQuery: SessionQuery) {
  }

  ngOnInit() {
    this.sessionQuery.currentIndex$.subscribe(x => this.systemsindex = x);
    this.sessionQuery.formValue$.subscribe(x => this.formvalue = x);
  }

  systemChange(event, i) {
    if (event.value === 'Fahrenheit') {
      this.sessionService.updateSystem('imperial');
      this.sessionService.updateDegreeLetter('F');
      this.sessionService.updateData(this.formvalue, 'imperial');
    }

    if (event.value === 'Celsius') {
      this.sessionService.updateSystem('metric');
      this.sessionService.updateDegreeLetter('C');
      this.sessionService.updateData(this.formvalue, 'metric');
    }

    if (event.value === 'Kelvin') {
      this.sessionService.updateSystem('');
      this.sessionService.updateDegreeLetter('K');
      this.sessionService.updateData(this.formvalue, '');
    }
    this.sessionService.updateIndex(i);
  }

}
