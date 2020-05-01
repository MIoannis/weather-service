import {Component, OnInit} from '@angular/core';
import {SessionService} from './Akita/session.service';
import {SessionQuery} from './Akita/session.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  town: string;
  data: any;

  constructor(private sessionService: SessionService,
              private sessionQuery: SessionQuery) {}

  ngOnInit() {
    this.sessionQuery.chooseTown$.subscribe(x => this.town = x);
    this.sessionService.getData(`https://api.openweathermap.org/data/2.5/weather?q=${this.town}&appid=85613b41b1d52401d7954897bc7b0ef8`)
      .subscribe(data => this.data = data, err => console.log(err));
  }
}
