import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabformComponent } from './collabform.component';

describe('CollabformComponent', () => {
  let component: CollabformComponent;
  let fixture: ComponentFixture<CollabformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollabformComponent]
    });
    fixture = TestBed.createComponent(CollabformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
