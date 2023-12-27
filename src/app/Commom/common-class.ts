export enum FileType {
  IMAGE = 'IMAGE',
  PDF = 'PDF',
  EXCEL = 'EXCEL',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOC = 'DOC',
  TEXT = 'TEXT',
}

export class Cls_SingleFileUpload {
  FID = 0;
  FileName = '';
  FileType = '';
  BlobFile = ''; // Virtual
}

export class ConfirmationDialogData {
  message!: string;
  title!: string;
  okButton!: string;
  cancelButton!: string;
}
