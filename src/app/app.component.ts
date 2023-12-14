// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   title = 'ChefConnect';
// }
import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { User_Service } from './user-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  parametro: any;

  ngOnInit() {
    // let email = this.route.snapshot?.paramMap.get('email') || null;
    this.parametro = localStorage.getItem('email');
    console.log('afdajernfalkjwenglakwjerng ' + localStorage.getItem('email'));
  }
  archivo = {
    nombre: '',
    nombreArchivo: '',
    base64textString: '',
  };
  public isCollapsed = false;

  loginbtn: boolean;
  logoutbtn: boolean;

  constructor(
    private dataService: ApiService,
    private userService: User_Service
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

  // seleccionarArchivo(event: any) {
  //   var files = event.target.files;
  //   var file = files[0];
  //   this.archivo.nombreArchivo = file.name;

  //   if (files && file) {
  //     var reader = new FileReader();
  //     reader.onload = this._handleReaderLoaded.bind(this);
  //     reader.readAsBinaryString(file);
  //   }
  // }

  // _handleReaderLoaded(readerEvent: any) {
  //   var binaryString = readerEvent.target.result;
  //   this.archivo.base64textString = btoa(binaryString);
  // }

  // upload() {
  //   console.log(this.archivo);
  //   this.userService.uploadFile(this.archivo).subscribe((datos: any) => {
  //     if (datos['resultado'] == 'OK') {
  //       alert(datos['mensaje']);
  //     }
  //   });
  // }
}
