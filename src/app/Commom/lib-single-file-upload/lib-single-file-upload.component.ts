import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Cls_SingleFileUpload, FileType } from '../common-class';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/Global/global.service';

@Component({
  selector: 'lib-single-file-upload',
  templateUrl: './lib-single-file-upload.component.html',
  styleUrls: ['./lib-single-file-upload.component.scss'],
})
export class LibSingleFileUploadComponent implements OnInit {
  // Type of file : Image, PDF, Excel, Video, Audio, Doc, Text
  constructor(
    private toastr: ToastrService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {}

  /**
   * Label of the file upload box
   */
  @Input() label: string = '';

  /**
   * Is Required symbol
   */
  @Input() isRequired: boolean = false;

  /**
   * Root URL of server, Where file is uploaded
   */
  @Input() rootURL: string = '';

  /**
   * Path / Folder name of the file where file is saved / stored
   */
  @Input() FilePath: string = '';

  /**
   * Accepted File Types : Image, PDF, Excel, Video, Audio, Doc, Text
   */
  @Input() FileTypes: string = 'IMAGE';

  /**
   * It will accept file type as EXCEL and return JSON of the uploaded excel.
   */
  @Input() isExcelToJson: boolean = false;

  /**
   * Max file size in MB
   */
  @Input() Size: number = 2;
  @Input() currentFile = new Cls_SingleFileUpload();

  @Output() currentFileChange = new EventEmitter();

  /**
   * It will return JSON of the uploaded excel.
   */
  @Output() excelJsonListChange = new EventEmitter();
  @ViewChild('fileInput') fileInput!: ElementRef;

  FILE_TYPE = FileType;

  private selectedFileType: string = '';

  onClickUploadFile() {
    this.fileInput?.nativeElement?.click();
  }

  private validateFile(file: File): boolean {
    let isValid: boolean = true;
    const fileType: string = file.name;
    this.selectedFileType = '';

    if (this.globalService.imageRegex.test(fileType)) {
      this.selectedFileType = FileType.IMAGE;
      isValid = true;
    }

    if (this.globalService.pdfRegex.test(fileType)) {
      this.selectedFileType = FileType.PDF;
      isValid = true;
    }

    if (this.globalService.excelRegex.test(fileType)) {
      this.selectedFileType = FileType.EXCEL;
      isValid = true;
    }

    if (this.globalService.videoRegex.test(fileType)) {
      this.selectedFileType = FileType.VIDEO;
      isValid = true;
    }

    if (this.globalService.audioRegex.test(fileType)) {
      this.selectedFileType = FileType.AUDIO;
      isValid = true;
    }

    if (this.globalService.docRegex.test(fileType)) {
      this.selectedFileType = FileType.DOC;
      isValid = true;
    }

    if (this.globalService.textRegex.test(fileType)) {
      this.selectedFileType = FileType.TEXT;
      isValid = true;
    }

    isValid = !!this.FileTypes?.split(',')
      ?.map((el) => el?.trim())
      .find((el) => el === this.selectedFileType);

    if (!isValid) {
      this.toastr.info('Invalid File Type', 'Info');
      this.fileInput.nativeElement.value = '';
      return false;
    }

    if (file.size > this.Size * 1024 * 1024) {
      this.toastr.info(
        `File Size is too large. Max File Size is ${this.Size} MB`,
        'Info'
      );
      this.fileInput.nativeElement.value = '';
      return false;
    }

    return isValid;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!this.validateFile(file)) return;
    const myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = () => {
      const fileBase64 = myReader.result as string;
      const blob = new Blob(event.target.files, { type: file.type });
      const blobUrl = window.URL.createObjectURL(blob);
      this.currentFile.FID = 0;
      this.currentFile.FileName = fileBase64;
      this.currentFile.FileType = this.selectedFileType;
      this.currentFile.BlobFile = blobUrl;
      this.currentFileChange.emit(this.currentFile);
      this.fileInput.nativeElement.value = '';
    };
  }

  onDelete() {
    this.currentFile.FID = 0;
    this.currentFile.FileName = '';
    this.currentFile.FileType = '';
    this.currentFile.BlobFile = '';
    this.currentFileChange.emit(this.currentFile);
    this.excelJsonListChange.emit([]);
  }
}
