import { Component, OnInit, AfterViewInit, Input, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreTranslationService } from '@core/services/translation.service';
import { locale as vi } from '../../i18n/vi';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {environment} from "../../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
export class DivisionsComponent implements OnInit, AfterViewInit {
  public divisionsList: Array<any>;
  public form: FormGroup;
  public loading = false;
  public submitted = false;

  public divisionParent: number = -1;
  @ViewChild('allTheseThings') things: any;
  ngAfterViewInit() {
    console.log('ngAfterViewInit')
    this.form.reset({ divisionName: '', divisionParent: this.divisionParent });

  }
  @Input() name;
  constructor(
      private _coreTranslationService: CoreTranslationService,
      private _http: HttpClient,
      private _formBuilder: FormBuilder,
      public activeModal: NgbActiveModal
  ) {
    this._coreTranslationService.translate(vi)
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      divisionName: new FormControl('', Validators.required ),
      divisionParent: new FormControl(this.divisionParent)
    })
    this.fetchDivisions()
  }
  get f() {
    return this.form.controls;
  }
  formChangeParent(event) {
    console.log(event)
    this.divisionParent = event.target.value;
  }
  onSubmit() {
    this.loading = true;
    let requestUrl = `${environment.apiUrl}/admin/division/addNew`;
    let request = this._http.post<any>(requestUrl, {
      name: this.f.divisionName.value,
      parent: this.f.divisionParent.value
    }).subscribe(response => {
      if (response.success) {
        this.fetchDivisions()

      } else {

      }
      this.loading = false;
    })
  }
  fetchDivisions(page = 0,  limit = -1, orderBy?: string, order?: string) {
    let requestUrl = `${environment.apiUrl}/admin/division/get/${page}/${limit}`;
    if (orderBy) {
      requestUrl += `/${orderBy}/${order}`;
    }
    let request = this._http.get<any>(requestUrl).subscribe(response => {
      if (response.success) {
        this.divisionsList = response.data.records;
        this.divisionsList = this.divisionsList.map(division => {
          division.hasChild = this.divisionsList.some(child => {
            return child.parent && child.parent.id === division.id
          })
          return division;
        })
        this.form.reset({ divisionName: '', divisionParent: this.divisionParent });
        console.log(this.divisionsList, this.divisionParent)
      }
    })
  }

  getChildOf(parent?: any) {
    if (this.divisionsList)
      return this.divisionsList.filter(division => {
        if (parent) {
          return division.parent && division.parent.id == parent.id;
        } else {
          return division.parent === null;
        }
      })
    return []
  }

}
