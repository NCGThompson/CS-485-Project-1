import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { XmlDomDisplayComponent } from '../xml-dom-display/xml-dom-display.component';

@Component({
  selector: 'app-current-data-tab',
  standalone: true,
  imports: [XmlDomDisplayComponent, HttpClientModule],
  templateUrl: './current-data-tab.component.html',
})
export class CurrentDataTabComponent implements OnInit {
  myXmlDocument?: XMLDocument;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadXmlDocument();
  }

  loadXmlDocument(): void {
    this.http.get('vds/current', { responseType: 'text' }).subscribe({
      next: xmlContent => {
        // Convert XML string to XMLDocument
        const parser = new DOMParser();
        this.myXmlDocument = parser.parseFromString(
          xmlContent,
          'application/xml'
        );
      },
      error: err => {
        console.error('Error fetching XML file:', err);
      },
    });
  }
}
