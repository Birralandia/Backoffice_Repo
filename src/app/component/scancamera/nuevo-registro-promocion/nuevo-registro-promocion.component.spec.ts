import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRegistroPromocionComponent } from './nuevo-registro-promocion.component';

describe('NuevoRegistroPromocionComponent', () => {
  let component: NuevoRegistroPromocionComponent;
  let fixture: ComponentFixture<NuevoRegistroPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoRegistroPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoRegistroPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
