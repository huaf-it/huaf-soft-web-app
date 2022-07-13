import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.roles.indexOf(Role.Admin) > -1;
  }

  /**
   *  Confirms if user is manager
   */
  get isManager() {
    return this.currentUser && this.currentUserSubject.value.roles.indexOf(Role.Manager) > -1;
  }

  /**
   * User login
   *
   * @param username
   * @param password
   * @returns user
   */
  login(username: string, password: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/authentication/login`, { username, password })
      .pipe(
        map(respone => {

          if (respone.success) {
            let user = respone.data;
            // login successful if there's a jwt token in the response
            if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('computerId', user.computer_id);

              // Display welcome toast!
              setTimeout(() => {
                this._toastrService.success(
                  'You have successfully logged in as an ' +
                    user.roles[0] +
                    ' user to Vuexy. Now you can start to explore. Enjoy! 🎉',
                  '👋 Welcome, ' + user.givenName + '!',
                  { toastClass: 'toast ngx-toastr', closeButton: true }
                );
              }, 2500);

              // notify
              this.currentUserSubject.next(user);
            }

          } else {
            this._toastrService.error(
              respone.msg,
              respone.error_type,
              { toastClass: 'toast ngx-toastr', closeButton: true }
            );
          }
          
          return respone;
        })
      );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('computerId');
    // notify
    this.currentUserSubject.next(null);
  }
}
