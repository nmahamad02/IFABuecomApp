import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiReportComponent } from './si-report.component';

describe('SiReportComponent', () => {
  let component: SiReportComponent;
  let fixture: ComponentFixture<SiReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
