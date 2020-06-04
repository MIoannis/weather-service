import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SessionService } from '../Akita/session.service';
import { SessionQuery } from '../Akita/session.query';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
  animations: [
    trigger('moveUp', [
      state('center', style({
        height: '90%',
      })),
      state('up', style({
        height: '40%',
      })),
      transition('center => up', [
        animate('1s ease-in-out')
      ]),
    ]),
    trigger('changeOpacity', [
      state('zero', style({
        opacity: 0
      })),
      state('full', style({
        opacity: 1
      })),
      transition('zero => full', [
        animate('1.5s')
      ]),
    ]),
    trigger('insertTrigger', [
      transition(':enter', [
        style({top: '125%'}),
        animate('1s ease-in-out', style({ left: '25%', top: '50%' })),
      ]),
    ])
  ]
})
export class MainpageComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private fvar: Subscription;
  private svar: Subscription;

  ctx: CanvasRenderingContext2D;

  degreeletter: string;
  currentsys: string;
  animVar: boolean;
  secondAnimVar: boolean;
  weatherdata: any;
  speed = 0;

  constructor(private sessionService: SessionService,
              public sessionQuery: SessionQuery) {
  }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.fvar = this.sessionQuery.animVar$.subscribe(x => this.animVar = x);
    this.svar = this.sessionQuery.secondAnimVar$.subscribe(x => this.secondAnimVar = x);
    this.sessionQuery.currentSystem$.subscribe(x => this.currentsys = x);
    this.sessionQuery.degreeLetter$.subscribe(x => this.degreeletter = x);
  }

  drawWind() {
    requestAnimationFrame(this.drawWind.bind(this));
    const canvas = this.canvas.nativeElement;
    this.ctx.lineWidth = 2;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.beginPath();

    this.ctx.moveTo(0, canvas.height / 2 - 12);
    for (let i = 0; i < canvas.width; i++) {
      this.ctx.lineTo(i, canvas.height / 2 - 12 + Math.sin(i * 0.04 + this.speed) * 15);
    }

    this.ctx.moveTo(0, canvas.height / 2);
    for (let i = 0; i < canvas.width; i++) {
      this.ctx.lineTo(i, canvas.height / 2 + Math.sin(i * 0.04 + this.speed) * 15);
    }

    this.ctx.moveTo(0, canvas.height / 2 + 12);
    for (let i = 0; i < canvas.width; i++) {
      this.ctx.lineTo(i, canvas.height / 2 + 12 + Math.sin(i * 0.04 + this.speed) * 15);
    }

    this.ctx.stroke();
    this.speed += 0.05;
  }

  chooseTown(f: NgForm) {
    this.sessionService.updateData(f.value.town, this.currentsys);
    this.sessionService.updateValue(f.value.town);
    this.sessionService.updateAnimVar(false, true);
    this.fvar.unsubscribe();
    this.svar.unsubscribe();
  }

}
