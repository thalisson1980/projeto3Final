import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioPontosComponent } from './bio-pontos.component';

describe('BioPontosComponent', () => {
  let component: BioPontosComponent;
  let fixture: ComponentFixture<BioPontosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BioPontosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BioPontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
