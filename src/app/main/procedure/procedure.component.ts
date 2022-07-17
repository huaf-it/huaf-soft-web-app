import { Component, OnInit } from '@angular/core';
import { locale as vi } from './i18n/vi';
import { CoreTranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class ProcedureComponent implements OnInit {


  /**
   *
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(
    private _coreTranslationService: CoreTranslationService,
  ) {
    this._coreTranslationService.translate(vi)
  }

  ngOnInit(): void {
  }

}
