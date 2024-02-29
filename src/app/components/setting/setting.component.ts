import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { KeyValuePipe } from '@angular/common';
import { Subscription, interval, switchMap } from 'rxjs';

import { ConsolodatedViewerComponent } from '../consolodated-viewer/consolodated-viewer.component';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ConsolodatedViewerComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  
}
