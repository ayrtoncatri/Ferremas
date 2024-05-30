import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousemanViewComponent } from './warehouseman-view.component';

describe('WarehousemanViewComponent', () => {
  let component: WarehousemanViewComponent;
  let fixture: ComponentFixture<WarehousemanViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehousemanViewComponent]
    });
    fixture = TestBed.createComponent(WarehousemanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
