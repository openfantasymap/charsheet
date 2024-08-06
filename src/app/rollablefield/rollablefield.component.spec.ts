import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollablefieldComponent } from './rollablefield.component';

describe('RollablefieldComponent', () => {
  let component: RollablefieldComponent;
  let fixture: ComponentFixture<RollablefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollablefieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RollablefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
