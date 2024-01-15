import { Injectable } from '@angular/core';
import { Historial } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  history: Historial[];

  constructor() {
    this.history = [];
  }

  addHistory(newHistorial: Historial) {
    this.history.unshift(newHistorial);
  }

  allHistory(email: string) {
    return this.history.filter((elem: Historial) => elem.user.email === email);
  }
}
