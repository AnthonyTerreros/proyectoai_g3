import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { HistorylistComponent } from '../../components/historylist/historylist.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NavbarComponent, HistorylistComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {}
