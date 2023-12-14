// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserServiceService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recetas } from './recetas';
// import { Users } from './users';
// import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class User_Service {
  baseUrl = 'http://localhost/angular/chefConnect/ChefConnect/php/';

  constructor(private http: HttpClient) {}

  getUsers(email: any) {
    // return this.http.get(`${this.baseUrl}/users.php`);
    return this.http.get(`${this.baseUrl}/userEmail.php?email=${email}`);
  }

  getRecetas() {
    return this.http.get(`${this.baseUrl}/recetas.php`);
  }

  getRecetasById(email:any) {
    return this.http.get(`${this.baseUrl}/recetasById.php?email=${email}`);
  }

  uploadFile(archivo: any) {
    return this.http.post(
      `${this.baseUrl}subirArchivo.php`,
      JSON.stringify(archivo)
    );
  }
  // getMascota(id: string | number) {
  //   return this.http.get(`${this.baseUrl}/get.php?idMascota=${id}`);
  // }

  // addMascota(mascota: Mascota) {
  //   return this.http.post(`${this.baseUrl}/post.php`, mascota);
  // }

  deleteRecetas(indice: any) {
    return this.http.delete(
      `${this.baseUrl}/deleteReceta.php?indice=${indice}`
    );
  }

  // updateMascota(mascota: Mascota) {
  //   return this.http.put(`${this.baseUrl}/update.php`, mascota);
  // }
}
