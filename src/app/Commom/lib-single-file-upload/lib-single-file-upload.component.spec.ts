import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibSingleFileUploadComponent } from './lib-single-file-upload.component';

describe('LibSingleFileUploadComponent', () => {
  let component: LibSingleFileUploadComponent;
  let fixture: ComponentFixture<LibSingleFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibSingleFileUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibSingleFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
