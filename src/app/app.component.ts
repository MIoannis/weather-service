import {Component, OnInit} from '@angular/core';
import {SessionService} from './Akita/session.service';
import {SessionQuery} from './Akita/session.query';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  weatherdata: any;

  constructor(private sessionService: SessionService,
              public sessionQuery: SessionQuery) { }

  chooseTown(f: NgForm) {
    this.sessionService.updateData(f.value.town);
  }
}
