import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  currentURL: string = 'https://smstestbed.nist.gov/vds/current';
  sampleURL: string = 'https://smstestbed.nist.gov/vds/sample';
  countURL: string = 'https://smstestbed.nist.gov/vds/sample?count=2000';

  constructor(private httpClient: HttpClient) {

  }

  getCurrentData() {
    return this.httpClient.get(this.currentURL, { responseType: 'text' })
      .pipe(
        map((response: any) => this.parseXmlToJson(response)),
        catchError(this.handleError)
      );
  }

  getSampleData() {
    return this.httpClient.get(this.sampleURL, { responseType: 'text' })
      .pipe(
        map((response: any) => this.parseXmlToJson(response)),
        catchError(this.handleError)
      );
  }

  getCountData() {
    return this.httpClient.get(this.countURL, { responseType: 'text' })
      .pipe(
        map((response: any) => this.parseXmlToJson(response)),
        catchError(this.handleError)
      );
  }

  private parseXmlToJson(xmlData: string) {
    let jsonData;
    xml2js.parseString(xmlData, { explicitArray: false }, (error, result) => {
      if (error) {
        throw new Error('Error parsing XML: ' + error);
      } else {
        jsonData = result;
      }
    });
    return jsonData;
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


}
