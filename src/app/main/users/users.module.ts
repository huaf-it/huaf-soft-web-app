import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import {UsersComponent} from './users.component';
import { AuthGuard } from '../../auth/helpers';
import { Role } from '../../auth/models';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {DivisionsComponent, usersCount} from "./modals/divisions/divisions.component";


const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { animation: 'users', roles: [Role.Admin] },
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    UsersComponent,
    usersCount,
    DivisionsComponent,
  ],
  imports: [
    RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule, NgbModule, NgxDatatableModule
  ],
  exports: [UsersComponent]
})
export class UsersModule { }
