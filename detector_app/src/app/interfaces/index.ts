export interface User {
  id?: string;
  names: string;
  lastnames: string;
  email: string;
  dni: string;
}

export interface Evaluacion {
  id?: string;
  user: User;
  descripcion: string;
  calificacion: number;
  images_url: string[];
}

export interface DialogData {
  user: User;
  images_url: string[];
}

export interface Historial {
  user: User;
  predictions: any[];
  images: any[];
}
