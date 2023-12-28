import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  @Input() rating: number = 5;
  @Input() starSelected = 0;
  @Output() onRating: EventEmitter<number> = new EventEmitter<number>();

  previousSelection: number = 0;
  starRating: number[] = [];

  constructor() {
    this.starRating = Array(this.rating).fill(0);
  }

  handleMouseEnter(index: number) {
    this.starSelected = index + 1;
  }

  handleMouseLeave(index: number) {
    if (this.previousSelection !== 0) {
      this.starSelected = this.previousSelection;
      return;
    }
    this.starSelected = 0;
  }

  makeRating(index: number) {
    this.starSelected = index + 1;
    this.previousSelection = this.starSelected;
    this.onRating.emit(this.starSelected);
  }
}
