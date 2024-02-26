import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-template-driven-settings',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './template-driven-settings.component.html',
})
export class TemplateDrivenSettingsComponent {
  baseUrl: string = ''; // Initialize with actual default or fetched value
  numberOfSamples: number = 100; // Default or fetched value
  autoRefresh: boolean = true; // Default or fetched value
  defaultBaseUrl: string = '/vds'; // Your default Base URL

  restoreDefault(): void {
    this.baseUrl = this.defaultBaseUrl;
  }
}
