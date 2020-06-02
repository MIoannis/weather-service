import { Component } from '@angular/core';
import {SessionService} from '../Akita/session.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  systems: string[] = ['Fahrenheit', 'Celsius', 'Kelvin'];

  constructor(private  sessionService: SessionService) { }

  systemChange(event) {
    if (event.value === 'Fahrenheit') {
      this.sessionService.updateSystem('imperial');
    }

    if (event.value === 'Celsius') {
      this.sessionService.updateSystem('metric');
    }

    if (event.value === 'Kelvin') {
      this.sessionService.updateSystem('');
    }
  }

}
