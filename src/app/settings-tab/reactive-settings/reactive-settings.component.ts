import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-reactive-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
  ],
  templateUrl: './reactive-settings.component.html',
})
export class ReactiveSettingsComponent {
  samplesFormControl = new FormControl();
  baseUrlControl = new FormControl();

  options = this._formBuilder.group({
    samplesNumber: this.samplesFormControl,
    baseUrl: this.baseUrlControl,
  });

  constructor(private _formBuilder: FormBuilder) {}

  getBaseUrl(): string {
    return this.baseUrlControl.value || '/vds/';
  }
  getSampleCount(): string {
    return this.baseUrlControl.value || '100';
  }
}
