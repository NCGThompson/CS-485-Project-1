import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class XmlService {
  constructor(private http: HttpClient) {}

  getXml(url: string) {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(response => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'application/xml');
        if (doc.getElementsByTagName('parsererror').length > 0) {
          throw new Error('Error parsing XML');
        }
        return doc;
      }),
      catchError(error => {
        console.error('An error occurred:', error.message);
        return throwError(
          () => new Error('Failed to load XML. Please try again later.')
        );
      })
    );
  }
}
