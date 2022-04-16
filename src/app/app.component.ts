import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AR_EXPORTS, HtmlExportService, PdfExportService, XlsxExportService } from '@grapecity/activereports-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    {
      provide: AR_EXPORTS,
      useClass: PdfExportService,
      multi: true,
    },
    {
      provide: AR_EXPORTS,
      useClass: HtmlExportService,
      multi: true,
    },
    {
      provide: AR_EXPORTS,
      useClass: XlsxExportService,
      multi: true,
    },
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ifabuecom';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  showCRM: boolean = true;
  showSC: boolean = true;
  showMMP: boolean = true;
  showMIS: boolean = true;
  showPMP: boolean = true;
  showHRMS: boolean = true;
  showWMS: boolean = true;
  showECom: boolean = true;
  showAT: boolean = true;
  showFn: boolean=true;

  siteLanguage: string = 'English';
  siteLocale!: string;
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' }
  ];

  constructor() { }
  
  ngOnInit() {
    this.siteLocale = window.location.pathname.split('/')[1];

    this.siteLanguage = this.languageList.find(f => f.code === this.siteLocale)!.label;
  }
}
