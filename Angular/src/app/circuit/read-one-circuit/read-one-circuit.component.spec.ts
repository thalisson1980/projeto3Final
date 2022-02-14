import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOneCircuitComponent } from './read-one-circuit.component';

describe('ReadOneCircuitComponent', () => {
  let component: ReadOneCircuitComponent;
  let fixture: ComponentFixture<ReadOneCircuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadOneCircuitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOneCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
