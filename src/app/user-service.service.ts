// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserServiceService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Users } from './users';
// import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class User_Service {
  baseUrl = 'http://localhost/angular/chefConnect/ChefConnect/php/';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.baseUrl}/users.php`);
  }

  getRecetas() {
    return this.http.get(`${this.baseUrl}/recetas.php`);
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

  // deleteMascota(mascota: Mascota) {
  //   return this.http.delete(
  //     `${this.baseUrl}/delete.php?idMascota=${mascota.id}`
  //   );
  // }

  // updateMascota(mascota: Mascota) {
  //   return this.http.put(`${this.baseUrl}/update.php`, mascota);
  // }
}
