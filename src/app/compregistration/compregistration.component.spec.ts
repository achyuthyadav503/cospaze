import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompregistrationComponent } from './compregistration.component';

describe('CompregistrationComponent', () => {
  let component: CompregistrationComponent;
  let fixture: ComponentFixture<CompregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
