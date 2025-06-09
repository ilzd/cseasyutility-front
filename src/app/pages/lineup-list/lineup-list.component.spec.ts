import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineupListComponent } from './lineup-list.component';

describe('LineupListComponent', () => {
  let component: LineupListComponent;
  let fixture: ComponentFixture<LineupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineupListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
