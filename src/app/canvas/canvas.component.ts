import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { SessionQuery } from '../store/session.query';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;

  system: string;
  windDrawValue = 0;
  windValue = 0;
  callbackNumber = 0;

  constructor(private sessionQuery: SessionQuery) { }

  @Input() set speedData(speed: number){
    this.windValue = speed;
    this.drawWind();
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.sessionQuery.currentSystem$.subscribe(x => this.system = x);
  }

  private drawWind() {
    cancelAnimationFrame(this.callbackNumber);
    this.callbackNumber = requestAnimationFrame( this.drawWind.bind(this) ); //animation loop
    const canvas = this.canvas.nativeElement;
    const height = canvas.height;
    const width = canvas.width;
    const context = this.ctx;
    context.lineWidth = 1;
    context.clearRect(0, 0, width, height);
    context.beginPath();

    context.moveTo(-10, height / 2);
    for (let i = 0; i < width; i++) {
      context.lineTo(
        i, height / 2 - 6 + Math.sin(
          i * 0.10 /*<= wave length*/ + this.windDrawValue * 1.15) * 5 /*<= amplitude*/);
    }

    context.moveTo(-10, height / 2);
    for (let i = 0; i < width; i++) {
      context.lineTo(i, height / 2 + Math.sin(i * 0.10 + this.windDrawValue * 1.15) * 5);
    }

    context.moveTo(-10, height / 2);
    for (let i = 0; i < width; i++) {
      context.lineTo(i, height / 2 + 6 + Math.sin(i * 0.10 + this.windDrawValue * 1.15) * 5);
    }

    context.stroke();
    if (this.system === 'imperial') {
      this.windDrawValue += this.windValue / 2.24;
    } else {
      this.windDrawValue += this.windValue;
    }
  }
}
