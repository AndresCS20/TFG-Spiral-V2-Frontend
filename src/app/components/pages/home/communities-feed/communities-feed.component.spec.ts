import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesFeedComponent } from './communities-feed.component';

describe('CommunitiesFeedComponent', () => {
  let component: CommunitiesFeedComponent;
  let fixture: ComponentFixture<CommunitiesFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunitiesFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunitiesFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
