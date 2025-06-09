import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPositionSelectorComponent } from './map-position-selector.component';

describe('MapPositionSelectorComponent', () => {
  let component: MapPositionSelectorComponent;
  let fixture: ComponentFixture<MapPositionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapPositionSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapPositionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
