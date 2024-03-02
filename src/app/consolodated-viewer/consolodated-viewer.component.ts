import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from './data.service';
import { KeyValuePipe } from '@angular/common';
import {
  Subscription,
  interval,
  concatMap,
  timeout,
  catchError,
  of,
} from 'rxjs';
import { XmlDomDisplayComponent } from '../xml-dom-display/xml-dom-display.component';

@Component({
  selector: 'app-consolodated-viewer',
  standalone: true,
  imports: [HttpClientModule, KeyValuePipe, XmlDomDisplayComponent],
  providers: [DataService, HttpClient],
  templateUrl: './consolodated-viewer.component.html',
})
export class ConsolodatedViewerComponent implements OnInit, OnDestroy {
  @Input() sourceUrl!: string;
  xmlDocument?: XMLDocument;
  private intervalSub!: Subscription; // IDE may gray out

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.intervalSub = interval(1000)
      .pipe(
        // This use of concatMap will delay updates until
        // any current downloads are already complete.
        // After 15 seconds it will give up and try again.
        concatMap(() =>
          this.shouldDownload()
            ? this.dataService.getData(this.sourceUrl).pipe(
                timeout(15000),
                catchError(() => {
                  console.error('Request timed out, retrying...');
                  return of(null);
                })
              )
            : of(null)
        )
      )
      .subscribe(xml => {
        if (xml) this.xmlDocument = xml;
      });
  }

  ngOnDestroy() {
    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
    }
  }

  shouldDownload(): boolean {
    return true;
  }
}
