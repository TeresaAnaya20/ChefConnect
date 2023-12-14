import { Component, OnInit } from '@angular/core';
import { User_Service } from '../user-service.service';
import { ApiService } from '../api.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { EmailServiceService } from '../email-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // providers: [EmailServiceService],
})
export class HomeComponent implements OnInit {
  recetas: any;
  loginbtn: boolean;
  logoutbtn: boolean;
  parametro: any;
  rct = {
    id: 0,
    nombre: '',
    tipo: '',
    descripcion: '',
    imagen: '',
    user: 0,
    like: 0,
    unlike: 0,
  };

  constructor(
    private userService: User_Service,
    private dataService: ApiService,
    private route: ActivatedRoute,
    private emailServiceService: EmailServiceService
  ) {
    dataService.getLoggedInName.subscribe((name) => this.changeName(name));
    if (this.dataService.isLoggedIn()) {
      console.log('loggedin');
      this.loginbtn = false;
      this.logoutbtn = true;
    } else {
      this.loginbtn = true;
      this.logoutbtn = false;
    }
  }
  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  logout() {
    this.dataService.deleteToken();
    window.location.href = window.location.href;
  }

  ngOnInit(): void {
    // this.recuperarTodos();
    // let email = this.emailServiceService.getEmailValue();
    // if (email) {
    //   console.log('Hola ' + email);
    // } else {
    //   console.log('El valor del correo es nulo o indefinido.');
    // }
    this.recuperarTodos();
    let email = this.emailServiceService.getEmailValue();
    if (email) {
      console.log('Hola ' + email);
    } else {
      console.log('El valor del correo es nulo o indefinido.');
    }
    // this.dato = localStorage.getItem('email');
    this.parametro = localStorage.getItem('email');
    console.log('afdajernfalkjwenglakwjerng ' + localStorage.getItem('email'));
  }

  recuperarTodos() {
    this.userService
      .getRecetas()
      .subscribe((result: any) => (this.recetas = result));
  }

  hayRegistros() {
    return true;
  }
}
