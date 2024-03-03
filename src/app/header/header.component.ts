import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentPage: string = 'current';
  constructor(private router: Router) {
    router.events
      .pipe(
        filter(
          (event: RouterEvent): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        console.log(event.url);
        if (event.url == '/') {
          this.currentPage = '/current';
        } else {
          this.currentPage = event.url;
        }
      });
  }
  openAnotherPage(page: string) {
    this.router.navigateByUrl(page);
  }
}