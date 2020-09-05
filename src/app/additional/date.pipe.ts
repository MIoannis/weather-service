import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sunDate'
})
export class DatePipe implements PipeTransform {

  transform(value: number): string {
    let date = new Date(value * 1000)
    if (date.getMinutes() < 10) {
      return date.getHours() + ':' + '0' + date.getMinutes();
    } else return date.getHours() + ':' + date.getMinutes();
  }
}
