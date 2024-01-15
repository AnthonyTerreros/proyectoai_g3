import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { HistorylistComponent } from '../../components/historylist/historylist.component';
import { HistorialService } from '../../services/historial.service';
import { Historial, User } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NavbarComponent, HistorylistComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  historiales: Historial[];

  constructor(
    private historialService: HistorialService,
    private authService: AuthService
  ) {
    let user = this.authService.getCurrentUser() as User;
    this.historiales = this.historialService.allHistory(user.email);
  }
}
