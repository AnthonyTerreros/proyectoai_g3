import { Injectable } from '@angular/core';
import { loadGraphModel } from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class ModeloDlService {
  model!: any;
  obj_classes: any;

  constructor() {
    this.loadModel();
    // this.obj_classes = this.model.getConfig();
    // console.log(this.obj_classes);
  }

  public predict(image: HTMLImageElement) {
    let tensorImage = this.resizingImage(image);
    let resultado = this.model.predict(tensorImage).dataSync();
    resultado = tf.softmax(resultado).dataSync();
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

  public getClassById(predArr: number[]) {
    let idx_max = tf.argMax(predArr, 1);
    return this.obj_classes.get(idx_max);
  }
}
