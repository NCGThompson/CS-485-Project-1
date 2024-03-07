import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  tabSelected: number = 0;
  tabArray: { label?: string; url?: string }[] = [
    { label: 'Current Data', url: '/' },
    { label: 'View Sample', url: '/sample' },
    { label: 'Settings', url: '/setting' },
  ];

  title = 'Project-1';
}
