import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { UsersComponent } from './users.component';
import { AuthGuard } from '../../auth/helpers';
import { Role } from '../../auth/models';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DivisionsModule } from "./modals/divisions/divisions.module";


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
    UsersComponent
  ],
  imports: [
    RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule, NgbModule, NgxDatatableModule, DivisionsModule
  ],
  exports: [UsersComponent]
})
export class UsersModule { }
