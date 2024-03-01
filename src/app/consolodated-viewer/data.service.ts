/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  currentURL: string = '/assets/test-data/current.xml';
  sampleURL: string = '/assets/test-data/sample.xml';
  countURL: string = '/assets/test-data/big-sample.xml'; // count=10000

  constructor(private httpClient: HttpClient) {}

  getData(sourceUrl: string) {
    return this.httpClient.get(sourceUrl, { responseType: 'text' }).pipe(
      map((response: string) => this.parseXmlToDom(response)),
      catchError(this.handleError)
    );
  }

  private parseXmlToDom(xmlData: string): XMLDocument {
    const parser: DOMParser = new DOMParser();
    return parser.parseFromString(xmlData, 'text/xml');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
