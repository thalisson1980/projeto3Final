import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOneColletionCircuitComponent } from './read-one-colletion-circuit.component';

describe('ReadOneColletionCircuitComponent', () => {
  let component: ReadOneColletionCircuitComponent;
  let fixture: ComponentFixture<ReadOneColletionCircuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadOneColletionCircuitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOneColletionCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
