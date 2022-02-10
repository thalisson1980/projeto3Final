import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCollectionComponent } from './read-collection.component';

describe('ReadCollectionComponent', () => {
  let component: ReadCollectionComponent;
  let fixture: ComponentFixture<ReadCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
