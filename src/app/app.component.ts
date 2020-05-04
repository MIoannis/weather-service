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
  town: string;
  weatherdata: string;

  constructor(private sessionService: SessionService,
              private sessionQuery: SessionQuery,
              private weatherapiService: WeatherapiService) {
  }

  ngOnInit() {
    this.sessionQuery.getTown$.subscribe(x => this.town = x);
    this.sessionQuery.getData$.subscribe(x => this.weatherdata = x);
  }

  changeTown(f: NgForm) {
    this.town = f.value.town;
    this.sessionService.updateTown(this.town);
    this.weatherapiService
      .getApiData(`https://api.openweathermap.org/data/2.5/weather?q=${this.town}&appid=${this.weatherapiService.apikey}`)
      .subscribe(data => this.weatherdata = JSON.stringify(data));
    this.sessionService.updateData(this.weatherdata);
    console.log(this.town, this.weatherdata);
  }
}
