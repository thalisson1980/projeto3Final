import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadContainerComponent } from './read-container.component';

describe('ReadContainerComponent', () => {
  let component: ReadContainerComponent;
  let fixture: ComponentFixture<ReadContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
