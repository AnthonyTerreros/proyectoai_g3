import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Evaluacion } from '../../interfaces';

@Component({
  selector: 'app-historylist',
  standalone: true,
  imports: [],
  templateUrl: './historylist.component.html',
  styleUrl: './historylist.component.css',
})
export class HistorylistComponent implements OnInit {
  diagnosticos: Evaluacion[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    let user = localStorage.getItem('user') || '';
    this.apiService.getHistoryByUser(user);
  }
}
