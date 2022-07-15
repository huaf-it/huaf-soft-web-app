import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { locale as vi } from './i18n/vi';

import { CoreTranslationService } from '@core/services/translation.service';
import { ColumnMode, DatatableComponent, SelectionType  } from '@swimlane/ngx-datatable';
import {UsersService} from "./users.service";
import {User} from "../../auth/models";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DivisionsComponent } from "./modals/divisions/divisions.component";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  math = Math;
  public contentHeader: object
  public selected = [];
  public selectAllOnPage = [];
  public selectedCountOnPage = [];
  public rows: any | User[];
  public columns: Array<object>
  private tempData = [];
  public Users: any;
  public countPerPage: number = 10;
  public totalRecords: number = 0;
  public offsetPageNumber: number = 0;
  public orderBy?: string;
  public order?: string;
  public ColumnMode = ColumnMode;
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public exportCSVData;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild(DivisionsComponent) divisionsComponent: DivisionsComponent;
  /**
   *
   * @param {CoreTranslationService} _coreTranslationService
   * @param {UsersService} _userService
   * @param {NgbModal} _modalService
   */
  constructor(
    private _coreTranslationService: CoreTranslationService,
    private _userService: UsersService,
    private _modalService: NgbModal
  ) {
    this._coreTranslationService.translate(vi)
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.Users = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * For ref only, log selected values
   *
   * @param selected
   */
  onSelect({ selected }) {
    // if (selected.length < this.selected.length) {
    //   this.selectAllOnPage[this.offsetPageNumber] = false;
    // }
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  /**
   * For ref only, log activate events
   *
   * @param selected
   */
  onActivate(event) {
    // console.log('Activate Event', event);
  }


  divisionsList(user: User): string {
    return user.divisions.map(division => {
      return division.name
    }).join(", ");
  }

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Quản lý người dùng',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Trang chủ',
            isLink: true,
            link: '/'
          },
          {
            name: 'Quản lý người dùng',
            isLink: false
          }
        ]
      }
    }
    this.setPage({offset: 0});
  }

  setPage(pageInfo) {
    this.offsetPageNumber = pageInfo.offset;
    this.fetch();
  }

  onSort(sort) {
    this.orderBy = sort.column.prop;
    this.order = sort.newValue;
    this.fetch();
  }

  fetch() {
    this._userService.getAll(this.offsetPageNumber, this.countPerPage, this.orderBy, this.order).subscribe(response => {
      if (response.success) {
        this.rows = response.data.records;
        this.totalRecords = response.data.totalRecords;
        this.tempData = this.rows;
        this.Users = this.rows.map(user => {
          user = <any>user;
          user.status = Math.floor(Math.random() * 4) + 1
          return user;
        });
        console.log(this.Users, this.selected)
        if (!this.selectedCountOnPage[this.offsetPageNumber]) this.selectedCountOnPage[this.offsetPageNumber] = 0;
      }
    })
  }

  getId(row) {
    return row.id;
  }

  selectAll(event) {
    if (!this.selectAllOnPage[this.offsetPageNumber]) {
      // Unselect all so we don't get duplicates.

      if (this.selected.length > 0) {
        this.Users.map(user => {

        })
        this.Users.map(user => {
          this.selected = this.selected.filter((selected) => selected.id !== user.id);
        });
      }

      // Select all again
      this.selected.push(...this.Users);
      this.Users = [... this.Users];
      this.selected = [... this.selected];
      this.selectedCountOnPage[this.offsetPageNumber] = this.countPerPage;
      this.selectAllOnPage[this.offsetPageNumber] = true;

    } else {
      // Unselect all
      this.Users.map(user => {
        this.selected = this.selected.filter((selected) => selected.id !== user.id);
      });
      this.selectedCountOnPage[this.offsetPageNumber] = 0;
      this.selectAllOnPage[this.offsetPageNumber] = false;
    }
  }

  onCheckboxChangeCustomFn(rowChanged) {
    let selected = this.selected.some(selected => selected.id === rowChanged.id)
    if (selected) {
      this.selected = this.selected.filter((selected) => selected.id !== rowChanged.id);
      this.selected = [... this.selected];
      this.selectAllOnPage[this.offsetPageNumber] = false;
      this.selectedCountOnPage[this.offsetPageNumber]--;
    } else {
      this.selected.push(rowChanged)
      this.selectedCountOnPage[this.offsetPageNumber]++;
      if (this.selectedCountOnPage[this.offsetPageNumber] == this.countPerPage) {
        this.selectAllOnPage[this.offsetPageNumber] = true;
      }
    }
    this.selected = [... this.selected];

  }
  openModal(modal) {
    console.log(modal)
    this._modalService.open(modal, {
      windowClass: 'modal'
    });
  }
  randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
