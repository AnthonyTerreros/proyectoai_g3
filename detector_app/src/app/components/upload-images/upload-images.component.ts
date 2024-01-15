import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Component } from '@angular/core';
import { ModalCalificacionComponent } from '../modals/modal-calificacion/modal-calificacion.component';
import { MatDialog } from '@angular/material/dialog';
import { ModeloDlService } from '../../services/modelo-dl.service';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { HistorialService } from '../../services/historial.service';
import { Historial } from '../../interfaces';
import { classes_index } from '../../constants';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [MatIconModule, MatProgressSpinnerModule, MatProgressBarModule],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.css',
})
export class UploadImagesComponent {
  images: string[] = [];
  predicionResultados: any[] = [];
  isLoading: boolean = false;
  classes_index: string[];

  constructor(
    public dialog: MatDialog,
    private modeloService: ModeloDlService,
    private authService: AuthService,
    private historialService: HistorialService
  ) {
    this.classes_index = Object.values(classes_index);
  }

  onSelectFiles(event: any) {
    if (event.target.files) {
      for (let k = 0; k < event.target.files.length; k++) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[k]);
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        };
      }
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
      this.isLoading = false;
      return;
    }
    for (let i = 0; i < this.images.length; i++) {
      let image = this.createImage(this.images[i]);
      let output = this.modeloService.predict(image);
      this.predicionResultados.push(output);
    }
    this.isLoading = false;
  }

  createImage(image: any) {
    let img = document.createElement('img');
    img.src = image;
    return img;
  }

  deleteImage(id: number) {
    this.images = this.images.filter((elem, index) => index !== id);
  }

  generatePDF(): void {
    const resultadosContainer =
      document.getElementById('resultados') || document.createElement('h1');
    console.log(resultadosContainer);
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFont('Arial');
    doc.setFontSize(12);
    doc.text('Detector de Enfermdades de Cacao', 10, 10);
    const options = {
      background: 'white',
      scale: 3,
    };

    html2canvas(resultadosContainer, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');
        let x = 100;
        let y = 100;
        let imgProps = (doc as any).getImageProperties(img);
        console.log(imgProps);
        const pdfWidth = doc.internal.pageSize.getHeight() - 2 * x;
        const pdfHeight = (imgProps.height * pdfWidth) / pdfWidth;
        console.log(pdfHeight, pdfWidth);
        doc.addImage(img, 'PNG', x, y, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_resultados.pdf`);
      });
  }

  getNameClass(pred: number[]): string {
    return this.modeloService.getClassById(pred);
  }

  cleanImages() {
    this.images = [];
    this.predicionResultados = [];
  }

  saveResult() {
    let data = {
      user: this.authService.getCurrentUser(),
      predictions: this.predicionResultados,
      images: this.images,
    } as Historial;
    this.historialService.addHistory(data);
    alert('Resultados Guardados');
    this.cleanImages();
  }

  roundedValue(val: number) {
    return val.toFixed(8);
  }
}
