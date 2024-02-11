import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-xml-frame',
  standalone: true,
  imports: [],
  templateUrl: './xml-frame.component.html',
  styleUrl: './xml-frame.component.css'
})
export class XmlFrameComponent {
  // Code from https://youtu.be/VCJ45dH0aOs?si=0N37k4j5i8zOvwzc
  private sanitizer = inject(DomSanitizer);
  trustedUrl: any = '';

  constructor() {
    // We need to implement a REAL sanitizer before allowing arbitrary base urls.
    // For example, make sure it is actually an XML.
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      // Should we use bypassSecurityTrustUrl instead?
      'https://smstestbed.nist.gov/vds/current'
    );
  }
}
