import { Component } from '@angular/core';
import { ModalCalificacionComponent } from '../modals/modal-calificacion/modal-calificacion.component';
import { MatDialog } from '@angular/material/dialog';
import { ModeloDlService } from '../../services/modelo-dl.service';
import jsPDF from 'jspdf';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.css',
})
export class UploadImagesComponent {
  images: any[] = [];
  predicionResultados: any[] = [];
  isLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private modeloService: ModeloDlService,
    private authService: AuthService
  ) {}

  onSelectFiles(event: any) {
    if (event.target.files) {
      for (let k = 0; k < event.target.files.length; k++) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[k]);
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        };
      }
      console.log(this.images);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCalificacionComponent, {
      data: {
        user: this.authService.getCurrentUser(),
        images_url: this.images,
      },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res === 'success') {
        alert('Gracias por colaborar.');
      } else {
        alert('Ocurrio un error. Intenta mas tarde.');
      }
    });
  }

  onSubmitImages(): void {
    this.isLoading = true;
    if (!this.images.length) {
      alert('Sube al menos una image!!');
      return;
    }
    for (let i = 0; i < this.images.length; i++) {
      let output = this.modeloService.predict(this.images[i]);
      this.predicionResultados.push(output);
    }
    this.isLoading = false;
  }

  generatePDF(): void {
    const doc = new jsPDF();
    const resultadosContainer = document.querySelector('.resultados');
    // const margins = {
    //   top: 30,
    //   bottom: 30,
    //   left: 10,
    //   right: 10,
    // };
    doc.setFont('Arial');
    doc.setFontSize(12);
    doc.text('Detector de Enfermdades de Cacao', 10, 10);
    doc.save('resultados.pdf');
  }
}
