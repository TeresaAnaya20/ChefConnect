import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../api.service';
// import { stringify } from 'querystring';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
// export class DashboardComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }
export class DashboardComponent implements OnInit {
  isCollapsed: boolean = true; // Puede ser true o false según tu lógica inicial
  // userJson = localStorage.getItem('currentUser');
  loginbtn: boolean;
  logoutbtn: boolean;
  loggedInName: string = '';
  parametro: any;

  ngOnInit() {
    // let email = this.route.snapshot?.paramMap.get('email') || null;
    this.parametro = localStorage.getItem('email');
    console.log('afdajernfalkjwenglakwjerng ' + localStorage.getItem('email'));
  }

  constructor(private dataService: ApiService, private route: ActivatedRoute) {
    dataService.getLoggedInName.subscribe((name) => this.changeName(name));
    // dataService.getLoggedInName.subscribe((name) => this.changeName(name));
    this.loggedInName = '';
    if (this.dataService.isLoggedIn()) {
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
