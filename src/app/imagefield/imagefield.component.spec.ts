import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagefieldComponent } from './imagefield.component';

describe('ImagefieldComponent', () => {
  let component: ImagefieldComponent;
  let fixture: ComponentFixture<ImagefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagefieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
