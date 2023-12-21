import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvantagestableComponent } from './avantagestable.component';

describe('AvantagestableComponent', () => {
  let component: AvantagestableComponent;
  let fixture: ComponentFixture<AvantagestableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvantagestableComponent]
    });
    fixture = TestBed.createComponent(AvantagestableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
