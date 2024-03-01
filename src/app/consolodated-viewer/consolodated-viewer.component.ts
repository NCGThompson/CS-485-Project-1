/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './data.service';
import { KeyValuePipe } from '@angular/common';
import { Subscription, interval, switchMap } from 'rxjs';
import { XmlDomDisplayComponent } from '../xml-dom-display/xml-dom-display.component';

@Component({
  selector: 'app-consolodated-viewer',
  standalone: true,
  imports: [HttpClientModule, KeyValuePipe, XmlDomDisplayComponent],
  providers: [DataService, HttpClient],
  templateUrl: './consolodated-viewer.component.html',
})
export class ConsolodatedViewerComponent implements OnInit {
  @Input() sourceUrl!: string;
  xmlDocument?: XMLDocument;
  private intervalSub!: Subscription; // IDE may gray out

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.intervalSub = interval(1000)
      .pipe(switchMap(() => this.dataService.getData(this.sourceUrl)))
      .subscribe(res => {
        if (res) this.xmlDocument = res;
      });
  }
}
