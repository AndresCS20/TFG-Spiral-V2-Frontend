import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarFrameComponent } from './avatar-frame.component';

describe('AvatarFrameComponent', () => {
  let component: AvatarFrameComponent;
  let fixture: ComponentFixture<AvatarFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarFrameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvatarFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
