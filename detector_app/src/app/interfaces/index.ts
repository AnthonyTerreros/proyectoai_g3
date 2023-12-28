interface User {
  id?: string;
  names: string;
  lastnames: string;
  email: string;
  dni: string;
}

interface Evaluacion {
  id?: string;
  user: User;
  descripcion: string;
  calificacion: number;
  images_url: string[];
}

interface DialogData {
  user: User;
  images_url: string[];
}
