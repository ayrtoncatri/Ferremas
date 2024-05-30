import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellermanViewComponent } from './sellerman-view.component';

describe('SellermanViewComponent', () => {
  let component: SellermanViewComponent;
  let fixture: ComponentFixture<SellermanViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellermanViewComponent]
    });
    fixture = TestBed.createComponent(SellermanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
