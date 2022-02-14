import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOneCollectionComponent } from './read-one-collection.component';

describe('ReadOneCollectionComponent', () => {
  let component: ReadOneCollectionComponent;
  let fixture: ComponentFixture<ReadOneCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadOneCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOneCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
