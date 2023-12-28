import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorylistComponent } from './historylist.component';

describe('HistorylistComponent', () => {
  let component: HistorylistComponent;
  let fixture: ComponentFixture<HistorylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
