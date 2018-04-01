import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListyourselfComponent } from './listyourself.component';

describe('ListyourselfComponent', () => {
  let component: ListyourselfComponent;
  let fixture: ComponentFixture<ListyourselfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListyourselfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListyourselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
