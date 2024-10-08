import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyMasterComponent } from './party-master.component';

describe('PartyMasterComponent', () => {
  let component: PartyMasterComponent;
  let fixture: ComponentFixture<PartyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
