import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User_Service } from '../user-service.service';
import {
  UntypedFormGroup,
  FormControl,
  UntypedFormBuilder,
  Validators,
  NgForm,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { EmailServiceService } from '../email-service.service';
// import { NgModule } from '@angular/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  // providers: [EmailServiceService],
})
export class ProfileComponent implements OnInit {
  archivo = {
    nombre: '',
    nombreArchivo: '',
    base64textString: '',
  };
  angForm: UntypedFormGroup;
  users: any;
  email: any;
  emailValue: any;
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
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private EmailServiceService: EmailServiceService
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
    let email = this.route.snapshot?.paramMap.get('email') || null;
    console.log('Hola ' + email);
    this.emailValue = email;
    localStorage.setItem('email', this.emailValue); //sefbwekfbwekjfjb
    // console.log('Holaa ' + this.emailValue);
    // this.EmailServiceService.setEmailValue(this.emailValue); // Almacena el valor en el servicio
    // console.log('getEmailValue ' + this.EmailServiceService.getEmailValue());
  }

  recuperarTodos() {
    let email = this.route.snapshot?.paramMap.get('email') || null;
    this.userService
      .getUsers(this.route.snapshot?.paramMap.get('email'))
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

  postdata(angForm1: UntypedFormGroup, emailValue: string) {
    this.dataService
      .recetaregistration(
        angForm1.value.nombre,
        angForm1.value.tipo,
        angForm1.value.descripcion,
        this.archivo.nombreArchivo,
        angForm1.value.user,
        this.emailValue
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
