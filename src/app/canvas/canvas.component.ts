import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  ctx: CanvasRenderingContext2D;

  winddrawvalue = 0;
  windvalue = 0;
  callbacknumber = 0;

  constructor() { }

  @Input() set speeddata(speed: number){
    this.windvalue = speed;
    this.drawWind();
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  drawWind() {
    cancelAnimationFrame(this.callbacknumber);
    this.callbacknumber = requestAnimationFrame(this.drawWind.bind(this));
    const canvas = this.canvas.nativeElement;
    this.ctx.lineWidth = 2;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.beginPath();

    this.ctx.moveTo(-10, canvas.height / 2 - 12);
    for (let i = 0; i < canvas.width; i++) {
      this.ctx.lineTo(i, canvas.height / 2 - 12 + Math.sin(i * 0.04 + this.winddrawvalue) * 15);
    }

    this.ctx.moveTo(-10, canvas.height / 2);
    for (let i = 0; i < canvas.width; i++) {
      this.ctx.lineTo(i, canvas.height / 2 + Math.sin(i * 0.04 + this.winddrawvalue) * 15);
    }

    this.ctx.moveTo(-10, canvas.height / 2 + 12);
    for (let i = 0; i < canvas.width; i++) {
      this.ctx.lineTo(i, canvas.height / 2 + 12 + Math.sin(i * 0.04 + this.winddrawvalue) * 15);
    }

    this.ctx.stroke();
    this.winddrawvalue += this.windvalue;
  }

}
