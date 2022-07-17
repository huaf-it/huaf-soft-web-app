import { NgModule } from '@angular/core';
import { CoreCommonModule } from '@core/common.module';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { AuthGuard } from '../../auth/helpers';
import { Role } from '../../auth/models';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ProcedureComponent } from './procedure.component';

const routes: Routes = [
  {
    path: 'procedures',
    component: ProcedureComponent,
    data: { animation: 'procedures', roles: [Role.Admin] },
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    ProcedureComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgbModule,
    NgxDatatableModule
  ],
  exports: [ProcedureComponent]
})
export class ProcedureModule { }
