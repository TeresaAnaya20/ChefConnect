import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardGuard  {
  constructor(private dataService: ApiService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const routeurl: string = state.url;
    return this.isLogin(routeurl);
  }

  isLogin(routeurl: string) {
    if (this.dataService.isLoggedIn()) {
      return true;
    }

    this.dataService.redirectUrl = routeurl;
    this.router.navigate(['/login'], { queryParams: { returnUrl: routeurl } });
    return false;
  }
}
