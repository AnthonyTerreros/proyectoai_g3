import { Component, Input, OnInit } from '@angular/core';
import { Historial } from '../../interfaces';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { classes_index } from '../../constants';

@Component({
  selector: 'app-historylist',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './historylist.component.html',
  styleUrl: './historylist.component.css',
})
export class HistorylistComponent implements OnInit {
  @Input() historiales: Historial[] = [];
  classes_index: string[] = [];
  constructor() {
    this.classes_index = Object.values(classes_index);
  }

  ngOnInit() {}
}
