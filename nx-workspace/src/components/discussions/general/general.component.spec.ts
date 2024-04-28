import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralForumComponent } from './general.component';

describe('GeneralComponent', () => {
  let component: GeneralForumComponent;
  let fixture: ComponentFixture<GeneralForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralForumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
