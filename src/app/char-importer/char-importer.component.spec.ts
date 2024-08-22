import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharImporterComponent } from './char-importer.component';

describe('CharImporterComponent', () => {
  let component: CharImporterComponent;
  let fixture: ComponentFixture<CharImporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharImporterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
