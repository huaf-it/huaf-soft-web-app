import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'app/auth/service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) {}

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authenticationService.currentUserValue;
    if (currentUser) {
      // check if route is restricted by role
      if (this.isNotAuthorized(route)) {
        // role not authorised so redirect to not-authorized page
        this._router.navigate(['/pages/miscellaneous/not-authorized']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/pages/authentication/login-v2'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  isNotAuthorized(route: ActivatedRouteSnapshot) {
    const currentUser = this._authenticationService.currentUserValue;
    
    if (currentUser) {
      if (route.data.roles && route.data.roles.length ) {
        for (let index = 0; index < currentUser.roles.length; index++) {
          const role = currentUser.roles[index];
          if (route.data.roles.indexOf(role) > -1) return false;
        }
        return true;
      }
      return false;
    } 

    return true;
  }
}
