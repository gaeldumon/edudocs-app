import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFormComponentComponent } from './upload-form-component.component';

describe('UploadFormComponentComponent', () => {
  let component: UploadFormComponentComponent;
  let fixture: ComponentFixture<UploadFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFormComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
