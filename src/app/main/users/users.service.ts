import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from "../../auth/service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient, private _toastrService: ToastrService, private _authenticationService: AuthenticationService) {}

  getAll(page = 0, limit = 10, orderBy?: string, order?: string) {
    let requestUrl = `${environment.apiUrl}/admin/user/get/${page}/${limit}`;
    if (orderBy) {
      requestUrl += `/${orderBy}/${order}`;
    }
    let request = this._http.get<any>(requestUrl)
    return request
  }
}
