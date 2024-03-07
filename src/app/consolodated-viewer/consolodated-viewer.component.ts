import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DataService } from './data.service';
import { KeyValuePipe } from '@angular/common';
import {
  Subscription,
  interval,
  concatMap,
  timeout,
  catchError,
  of,
  from,
  filter,
  mergeMap,
  startWith,
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
  @ViewChild('hostElement') hostElement!: ElementRef;
  @Input() sourceUrl!: string;
  xmlDocument?: XMLDocument;
  private intervalSub!: Subscription; // IDE may gray out

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.intervalSub = interval(1000)
      .pipe(
        startWith(0),
        // This use of concatMap will delay updates until
        // any current downloads are already complete.
        // After 30 seconds it will give up and try again.
        concatMap(() =>
          from(this.shouldDownload()).pipe(
            // Convert the Promise to an Observable
            filter(shouldDownload => shouldDownload), // Only proceed if shouldDownload is true
            mergeMap(() =>
              this.dataService.getData(this.sourceUrl).pipe(
                timeout(30000),
                catchError(() => {
                  console.error('Request timed out, retrying...');
                  return of(null);
                })
              )
            )
          )
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

  async shouldDownload(): Promise<boolean> {
    return this.xmlDocument == undefined || this.checkVisibility();
  }

  checkVisibility(): Promise<boolean> {
    return new Promise(resolve => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          resolve(entry.isIntersecting);
          observer.disconnect(); // Clean up the observer once we have our result
        },
        { threshold: 0.1 }
      );

      observer.observe(this.hostElement.nativeElement);
    });
  }
}
