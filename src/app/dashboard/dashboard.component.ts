import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../api.service';
// import { stringify } from 'querystring';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
// export class DashboardComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }
export class DashboardComponent {
  isCollapsed: boolean = true; // Puede ser true o false según tu lógica inicial
  // userJson = localStorage.getItem('currentUser');
  loginbtn: boolean;
  logoutbtn: boolean;
  loggedInName: string = '';

  constructor(private dataService: ApiService) {
    dataService.getLoggedInName.subscribe((name) => this.changeName(name));
    // dataService.getLoggedInName.subscribe((name) => this.changeName(name));
    this.loggedInName = '';
    if (this.dataService.isLoggedIn()) {
      console.log('loggedin '+ this.loggedInName + ' a');
      console.log('HOLAAA '+ this.loggedInName);
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
}
