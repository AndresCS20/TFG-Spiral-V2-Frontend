import { Pipe, PipeTransform } from '@angular/core';
import { DateService } from '../../core/services/date.service';

@Pipe({
  name: 'dateFromNow',
  standalone: true,
})
export class DateFromNowPipe implements PipeTransform {
  constructor(private dateService: DateService) {}

  transform(value: string | Date): string {
    if (!value) return '';
    return this.dateService.fromNow(value);
  }
}
