// import { Component } from '@angular/core';
// // import { UsersService } from '../users.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';

//   // constructor(public userService: UsersService) {}

//   // login() {
//   //   const user = { email: this.email, password: this.password };
//   //   this.userService.login(user).subscribe((data) => {
//   //     console.log(data);
//   //   });
//   // }
// }
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  angForm: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(1), Validators.email],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  postdata(angForm1: UntypedFormGroup) {
    this.dataService
      .userlogin(angForm1.value.email, angForm1.value.password)
      .pipe(first())
      .subscribe(
        (data) => {
          const redirect = this.dataService.redirectUrl
            ? this.dataService.redirectUrl
            : '/home' + this.email;
          // : '/dashboard';
          this.router.navigate([redirect]);
        },
        (error) => {
          alert('User name or password is incorrect');
        }
      );
  }
  get email() {
    return this.angForm.get('email');
  }
  get password() {
    return this.angForm.get('password');
  }
}
