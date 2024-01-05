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

  public predict(image: ImageData) {
    let tensorImage = this.resizingImage(image);
    let resultado = this.model.predict(tensorImage).dataSync();
    let valorPredicion = Array.from(resultado);
    return valorPredicion;
  }

  private resizingImage(image: ImageData) {
    let img = tf.browser.fromPixels(image, 3);
    img = img.reshape([3, 256, 256]);
    img = tf.cast(img, 'float32');
    return img;
  }

  private async loadModel() {
    const modelURL = '../../assets/modecnn_g3/model.json';
    this.model = await loadGraphModel(modelURL);
  }
}
