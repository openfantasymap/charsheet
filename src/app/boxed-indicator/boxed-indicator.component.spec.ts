import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxedIndicatorComponent } from './boxed-indicator.component';

describe('BoxedIndicatorComponent', () => {
  let component: BoxedIndicatorComponent;
  let fixture: ComponentFixture<BoxedIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxedIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxedIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
