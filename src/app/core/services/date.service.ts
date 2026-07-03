import { Injectable } from '@angular/core';
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  fromNow(date: string | Date): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true, locale: es });
  }

  formatDate(date: string | Date, pattern: string = 'PPP'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, pattern, { locale: es });
  }
}
