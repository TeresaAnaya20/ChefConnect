// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor() { }
// }
import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { Recetas } from './recetas';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private loggedInNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // getLoggedInName = this.loggedInNameSubject.asObservable();
  // loggedInName: string = '';
  redirectUrl: string = '';
  // baseUrl: string = 'http://localhost/angular_admin/php';
  baseUrl: string = 'http://localhost/angular/chefConnect/ChefConnect/php/';

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient: HttpClient) {}
  public userlogin(username: string, password: string) {
    this.loggedInNameSubject.next(username);
    alert(username);
    return this.httpClient
      .post<any>(this.baseUrl + '/login.php', { username, password })
      .pipe(
        map((Users) => {
          this.setToken(Users[0].name);
          this.getLoggedInName.emit(true);
          return Users;
        })
      );
  }

  public userregistration(name: string, email: string, pwd: string) {
    return this.httpClient
      .post<any>(this.baseUrl + '/register.php', { name, email, pwd })
      .pipe(
        map((Users) => {
          return Users;
        })
      );
  }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
    return false;
  }

  public recetaregistration(
    nombre: string,
    tipo: string,
    descripcion: string,
    imagen: string,
    user: number,
    email: string
  ) {
    console.log('Datos que se están enviando:', { nombre, tipo, descripcion, imagen, user, email });
    return this.httpClient
      .post<any>(this.baseUrl + '/registerReceta.php', {
        nombre,
        tipo,
        descripcion,
        imagen,
        user,
        email,
      })
      .pipe(
        map((Recetas) => {
          return Recetas;
        })
      );
  }
  // onLoggedIn() {
  //   this.getLoggedInName.subscribe((isLoggedIn: boolean) => {
  //     if (isLoggedIn) {
  //       this.loggedInName = this.getToken();
  //     }
  //   });
  // }
}
