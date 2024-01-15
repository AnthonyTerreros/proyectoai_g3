import { Injectable } from '@angular/core';
import { loadGraphModel } from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';
import { classes_index } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ModeloDlService {
  model!: any;
  obj_classes: any;
  classes_index: any;

  constructor() {
    this.loadModel();
    this.classes_index = classes_index;
  }

  public predict(image: HTMLImageElement) {
    let tensorImage = this.resizingImage(image);
    let resultado = this.model.predict(tensorImage).dataSync();
    resultado = tf.softmax(resultado).dataSync();
    let valorPredicion = Array.from(resultado);
    return valorPredicion;
  }

  private resizingImage(image: HTMLImageElement) {
    let img = tf.browser.fromPixels(image);
    img = img.resizeBilinear([256, 256]);
    img = img.reshape([1, 256, 256, 3]);
    img = tf.cast(img, 'float32');
    return img;
  }

  private async loadModel() {
    const modelURL = '../../assets/modelo_web_g3/model.json';
    this.model = await tf.loadLayersModel(modelURL);
  }

  public getClassById(predArr: number[]): string {
    let res = tf.argMax(predArr, -1).toString().split(' ').slice(-1)[0];
    let idx_max = parseInt(res);
    return this.classes_index[idx_max] as string;
  }
}
