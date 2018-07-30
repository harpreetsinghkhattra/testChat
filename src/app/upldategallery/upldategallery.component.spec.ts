import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpldategalleryComponent } from './upldategallery.component';

describe('UpldategalleryComponent', () => {
  let component: UpldategalleryComponent;
  let fixture: ComponentFixture<UpldategalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpldategalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpldategalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
