import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyRequestsComponent } from './key-requests.component';

describe('KeyRequestsComponent', () => {
  let component: KeyRequestsComponent;
  let fixture: ComponentFixture<KeyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
