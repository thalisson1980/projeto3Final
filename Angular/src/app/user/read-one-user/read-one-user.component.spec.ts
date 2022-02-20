import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOneUserComponent } from './read-one-user.component';

describe('ReadOneUserComponent', () => {
  let component: ReadOneUserComponent;
  let fixture: ComponentFixture<ReadOneUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadOneUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
