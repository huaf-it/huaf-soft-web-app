import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreTranslationService } from '@core/services/translation.service';
import { locale as vi } from '../../i18n/vi';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {environment} from "../../../../../environments/environment";
@Pipe( {
  name: 'usersCount'
} )
export class usersCount implements PipeTransform {
  transform(division: any) {
    if (division.users)
      return division.users.length;
    else
      return 0;
  }
}

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.scss']
})
export class DivisionsComponent implements OnInit {
  public divisionsList: Array<any>;
  @Input() name;
  constructor(
      private _coreTranslationService: CoreTranslationService,
      private _http: HttpClient,
      public activeModal: NgbActiveModal
  ) {
    this._coreTranslationService.translate(vi)
  }

  ngOnInit() {
    this.fetchDivisions()
  }

  fetchDivisions(page = 0,  limit = -1, orderBy?: string, order?: string) {
    let requestUrl = `${environment.apiUrl}/admin/division/get/${page}/${limit}`;
    if (orderBy) {
      requestUrl += `/${orderBy}/${order}`;
    }
    let request = this._http.get<any>(requestUrl).subscribe(response => {
      if (response.success) {
        this.divisionsList = response.data.records;
        console.log(this.divisionsList)
      }
    })
  }

}
