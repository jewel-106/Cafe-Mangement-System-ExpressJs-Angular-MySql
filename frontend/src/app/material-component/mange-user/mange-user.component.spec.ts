import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeUserComponent } from './mange-user.component';

describe('MangeUserComponent', () => {
  let component: MangeUserComponent;
  let fixture: ComponentFixture<MangeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
