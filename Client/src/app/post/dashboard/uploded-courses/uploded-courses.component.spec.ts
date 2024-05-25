import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplodedCoursesComponent } from './uploded-courses.component';

describe('UplodedCoursesComponent', () => {
  let component: UplodedCoursesComponent;
  let fixture: ComponentFixture<UplodedCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UplodedCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UplodedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
