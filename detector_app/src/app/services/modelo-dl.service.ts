import { Injectable } from '@angular/core';
import { loadGraphModel } from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class ModeloDlService {
  model!: any;

  constructor() {
    this.loadModel();
  }

  public predict(image: HTMLImageElement) {
    let tensorImage = this.resizingImage(image);
    let resultado = this.model.predict(tensorImage).dataSync();
    console.log(resultado);
    let valorPredicion = Array.from(resultado);
    return valorPredicion;
  }

  private resizingImage(image: HTMLImageElement) {
    console.log(image);
    let img = tf.browser.fromPixels(image);
    console.log(img);
    img = img.resizeBilinear([256, 256]);
    img = img.reshape([1, 256, 256, 3]);
    img = tf.cast(img, 'float32');
    return img;
  }

  private async loadModel() {
    const modelURL = '../../assets/modecnn_g3/model.json';
    this.model = await tf.loadLayersModel(modelURL);
  }
}
