import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublicationModalComponent } from './create-publication-modal.component';

describe('CreatePublicationModalComponent', () => {
  let component: CreatePublicationModalComponent;
  let fixture: ComponentFixture<CreatePublicationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePublicationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePublicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
