import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User_Service } from '../user-service.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm,
} from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  archivo = {
    nombre: '',
    nombreArchivo: '',
    base64textString: '',
  };
  angForm: FormGroup;
  users: any;

  usr = {
    id: 0,
    name: '',
    password: '',
    email: '',
  };

  loginbtn: boolean;
  logoutbtn: boolean;

  constructor(
    private dataService: ApiService,
    private userService: User_Service,
    private fb: FormBuilder
  ) {
    this.angForm = this.fb.group({
      nombre: '',
      tipo: '',
      descripcion: '',
      imagen: '',
      user: '',
    });
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
      .getUsers()
      .subscribe((result: any) => (this.users = result));
  }

  hayRegistros() {
    return true;
  }

  seleccionarArchivo(event: any) {
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent: any) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }

  upload() {
    console.log(this.archivo);
    this.userService.uploadFile(this.archivo).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        alert(datos['mensaje']);
      }
    });
  }

  postdata(angForm1: FormGroup) {
    this.dataService
      .recetaregistration(
        angForm1.value.nombre,
        angForm1.value.tipo,
        angForm1.value.descripcion,
        this.archivo.nombreArchivo,
        angForm1.value.user
      )
      .pipe(first())
      .subscribe(
        (data) => {
          alert('insertado');
        },

        (error) => {}
      );
  }

  get nombre() {
    return this.angForm.get('nombre');
  }
  get tipo() {
    return this.angForm.get('tipo');
  }
  get descripcion() {
    return this.angForm.get('descripcion');
  }

  get imagen() {
    return this.archivo.nombreArchivo;
  }

  get user() {
    return this.angForm.get('user');
  }
}
