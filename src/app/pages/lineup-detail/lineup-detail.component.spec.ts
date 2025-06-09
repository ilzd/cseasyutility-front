import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineupDetailComponent } from './lineup-detail.component';

describe('LineupDetailComponent', () => {
  let component: LineupDetailComponent;
  let fixture: ComponentFixture<LineupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineupDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
