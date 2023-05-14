import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesDetailsComponent } from './employes-details.component';

describe('EmployesDetailsComponent', () => {
  let component: EmployesDetailsComponent;
  let fixture: ComponentFixture<EmployesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
