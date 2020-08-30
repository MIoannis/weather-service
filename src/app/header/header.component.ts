import { Component, OnInit } from '@angular/core';
import { faCogs } from "@fortawesome/free-solid-svg-icons";

import { SessionService } from "../store/session.service";
import { SessionQuery } from "../store/session.query";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  setVar: boolean;

  faCogs = faCogs;
  white = 'white';
  pointer = 'pointer';

  constructor(private sessionService: SessionService,
              private sessionQuery: SessionQuery) { }

  ngOnInit(): void {
    this.sessionQuery.setVar$.subscribe(x => this.setVar = x);
  }

  set() {
    if(this.setVar === false) {
      this.sessionService.updateSetVar(true);
    } else {
      this.sessionService.updateSetVar(false);
    }
  }
}
