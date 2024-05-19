import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogInfoDialogComponent } from './dog-info-dialog.component';

describe('DogInfoDialogComponent', () => {
  let component: DogInfoDialogComponent;
  let fixture: ComponentFixture<DogInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogInfoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DogInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
