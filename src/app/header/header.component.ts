import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() tabArray!: string[];
  @Input() tabSelected: number | undefined;
  @Output() tabSelectedChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  openAnotherPage(index: number) {
    this.tabSelected = index;
    this.tabSelectedChange.emit(this.tabSelected);
  }
}
