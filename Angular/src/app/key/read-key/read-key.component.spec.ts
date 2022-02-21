import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadKeyComponent } from './read-key.component';

describe('ReadKeyComponent', () => {
  let component: ReadKeyComponent;
  let fixture: ComponentFixture<ReadKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
