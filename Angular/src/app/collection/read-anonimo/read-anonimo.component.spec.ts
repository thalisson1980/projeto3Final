import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAnonimoComponent } from './read-anonimo.component';

describe('ReadAnonimoComponent', () => {
  let component: ReadAnonimoComponent;
  let fixture: ComponentFixture<ReadAnonimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAnonimoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAnonimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
