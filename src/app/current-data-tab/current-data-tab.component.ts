import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Subscription, interval, concatMap } from 'rxjs';

import { XmlService } from '../simple-download-service';
import { XmlDomDisplayComponent } from '../xml-dom-display/xml-dom-display.component';

@Component({
  selector: 'app-current-data-tab',
  standalone: true,
  imports: [XmlDomDisplayComponent, HttpClientModule],
  templateUrl: './current-data-tab.component.html',
})
export class CurrentDataTabComponent implements OnInit, OnDestroy {
  xmlDocument?: XMLDocument;
  private intervalSub!: Subscription; // SAFETY: Initialized in ngOnInit

  constructor(private xmlService: XmlService) {}

  ngOnInit() {
    this.intervalSub = interval(1000)
      .pipe(
        // This use of concatMap SHOULD delay updates until
        // any current downloads are already complete.
        // To cancel pending updates, use switchMap instead.
        concatMap(() =>
          this.shouldDownload()
            ? this.xmlService.getXml('assets/test-data/current.xml')
            : [null]
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
