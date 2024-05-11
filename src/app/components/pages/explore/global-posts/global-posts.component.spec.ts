import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPostsComponent } from './global-posts.component';

describe('GlobalPostsComponent', () => {
  let component: GlobalPostsComponent;
  let fixture: ComponentFixture<GlobalPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
