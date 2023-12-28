import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { UploadImagesComponent } from '../../components/upload-images/upload-images.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, UploadImagesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
