import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() tabArray!: { label?: string; url?: string }[];
  @Input() tabSelected: number | undefined;
  @Output() tabSelectedChange: EventEmitter<number> = new EventEmitter();

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
      });
  }

  openAnotherPage(index: number) {
    this.tabSelected = index;
    this.tabSelectedChange.emit(this.tabSelected);

    const page: string = this.tabArray[index]?.url || '/';
    this.router.navigateByUrl(page);
  }
}
