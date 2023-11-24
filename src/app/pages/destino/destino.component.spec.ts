import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoComponent } from './destino.component';

describe('DestinoComponent', () => {
  let component: DestinoComponent;
  let fixture: ComponentFixture<DestinoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinoComponent]
    });
    fixture = TestBed.createComponent(DestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
