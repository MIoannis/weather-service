import {Component, OnInit} from '@angular/core';
import {SessionService} from './Akita/session.service';
import {SessionQuery} from './Akita/session.query';
import {WeatherapiService} from './weatherapi.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  weatherdata: any;

  constructor(private sessionService: SessionService,
              private sessionQuery: SessionQuery,
              private weatherapiService: WeatherapiService) { }

  ngOnInit() {
    this.sessionQuery.getData$.subscribe(x => this.weatherdata = x);
  }

  changeTown(f: NgForm) {
    this.weatherapiService
      .getApiData(`https://api.openweathermap.org/data/2.5/weather?q=${f.value.town}&appid=${this.weatherapiService.apikey}`)
      .subscribe(data => this.weatherdata = data);
    this.sessionService.updateData(this.weatherdata);
    document.getElementById('temp').textContent = String(Math.round(this.weatherdata.main.temp - 273));
  }
}
