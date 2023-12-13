import { Component, OnInit } from '@angular/core';
import { User_Service } from '../user-service.service';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-eliminarreceta',
  // standalone: true,
  // imports: [],
  templateUrl: './eliminarreceta.component.html',
  styleUrl: './eliminarreceta.component.css',
})
export class EliminarrecetaComponent implements OnInit {
  recetas: any;
  loginbtn: boolean;
  logoutbtn: boolean;

  rct = {
    indice: 0,
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
    private dataService: ApiService
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
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.userService
      .getRecetas()
      .subscribe((result: any) => (this.recetas = result));
  }

  hayRegistros() {
    return true;
  }

  delete(indice: any) {
    this.userService.deleteRecetas(indice).subscribe(
      (result: any) => (this.recetas = result),
      (error: any) => console.error('Error:', error)
    );
  }
}
