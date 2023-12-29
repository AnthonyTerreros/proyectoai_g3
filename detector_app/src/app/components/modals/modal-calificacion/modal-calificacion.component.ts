import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RatingComponent } from '../../rating/rating.component';
import { DialogData, Evaluacion, User } from '../../../interfaces';

@Component({
  selector: 'app-modal-calificacion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    RatingComponent,
    MatInputModule,
  ],
  templateUrl: './modal-calificacion.component.html',
  styleUrl: './modal-calificacion.component.css',
})
export class ModalCalificacionComponent {
  calificationForm: FormGroup;
  rating: number = 0;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCalificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.calificationForm = this.fb.group({
      description: new FormControl('', [Validators.required]),
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  handleRating(event: number) {
    this.rating = event;
  }

  submitCalification() {
    if (this.calificationForm.valid) {
      let data = {
        user: {} as User,
        descripcion: this.calificationForm.controls['description'].value,
        images_url: [],
        calificacion: this.rating,
      } as Evaluacion;
      console.log(data);
      // this.apiService.uploadCalification(data).subscribe(
      //   (res: any) => {
      //     if (res.status === 200) {
      //       alert('OK');
      //     } else {
      //       alert('Estamos teniendo problemas');
      //     }
      //   },
      //   (err: any) => {
      //     alert('Ocurrio un error');
      //   }
      // );
    }
  }
}
