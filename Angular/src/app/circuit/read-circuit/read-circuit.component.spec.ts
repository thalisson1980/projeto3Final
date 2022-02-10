import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCircuitComponent } from './read-circuit.component';

describe('ReadCircuitComponent', () => {
  let component: ReadCircuitComponent;
  let fixture: ComponentFixture<ReadCircuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadCircuitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
