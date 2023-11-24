import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajerosComponent } from './viajeros.component';

describe('ViajerosComponent', () => {
  let component: ViajerosComponent;
  let fixture: ComponentFixture<ViajerosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViajerosComponent]
    });
    fixture = TestBed.createComponent(ViajerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
