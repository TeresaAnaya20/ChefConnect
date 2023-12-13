export class Recetas {
  // public Id: number;
  public indice: number;
  public nombre: string;
  public tipo: string;
  public descripcion: string;
  public imagen: string;
  public user: string;

  constructor(
    // Id: number,
    indice: number,
    nombre: string,
    descripcion: string,
    tipo: string,
    imagen: string,
    user: string
  ) {
    // this.Id = Id;
    this.indice = indice;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.imagen = imagen;
    this.user = user;
  }
}
