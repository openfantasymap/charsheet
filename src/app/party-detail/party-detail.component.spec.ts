import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyDetailComponent } from './party-detail.component';

describe('PartyDetailComponent', () => {
  let component: PartyDetailComponent;
  let fixture: ComponentFixture<PartyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
