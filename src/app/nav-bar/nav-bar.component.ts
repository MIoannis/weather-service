import { Component, OnInit } from '@angular/core';
import { faCogs } from "@fortawesome/free-solid-svg-icons";

import { SessionService } from "../Akita/session.service";
import { SessionQuery } from "../Akita/session.query";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
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
    }
    if(this.setVar === true) {
      this.sessionService.updateSetVar(false);
    }
  }
}
