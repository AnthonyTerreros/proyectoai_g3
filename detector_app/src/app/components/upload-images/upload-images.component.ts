import { Component } from '@angular/core';
import { ModalCalificacionComponent } from '../modals/modal-calificacion/modal-calificacion.component';
import { MatDialog } from '@angular/material/dialog';
import { ModeloDlService } from '../../services/modelo-dl.service';

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.css',
})
export class UploadImagesComponent {
  images: any[] = [];

  constructor(
    public dialog: MatDialog,
    private modeloService: ModeloDlService
  ) {}

  onSelectFiles(event: any) {
    if (event.target.files) {
      for (let k = 0; k < event.target.files; k++) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[k]);
        reader.onload = (e: any) => {
          this.images.push(e.target.results);
        };
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCalificacionComponent, {
      data: { user: {}, images_url: [] },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      console.log('The dialog was closed');
    });
  }

  onSubmitImages(): void {}
}
