import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatekeyComponent } from './createkey.component';

describe('CreatekeyComponent', () => {
  let component: CreatekeyComponent;
  let fixture: ComponentFixture<CreatekeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatekeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatekeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
