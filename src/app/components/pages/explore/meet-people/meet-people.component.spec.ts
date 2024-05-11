import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetPeopleComponent } from './meet-people.component';

describe('MeetPeopleComponent', () => {
  let component: MeetPeopleComponent;
  let fixture: ComponentFixture<MeetPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetPeopleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
