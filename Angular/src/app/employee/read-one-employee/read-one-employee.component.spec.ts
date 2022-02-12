import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOneEmployeeComponent } from './read-one-employee.component';

describe('ReadOneEmployeeComponent', () => {
  let component: ReadOneEmployeeComponent;
  let fixture: ComponentFixture<ReadOneEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadOneEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOneEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
