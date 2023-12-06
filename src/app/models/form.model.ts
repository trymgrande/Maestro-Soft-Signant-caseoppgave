export class SignatureFormModel {
  recipientName: string = '';
  recipientEmail: string = '';
  message: string = '';
  pdfDocument: File | null = null;
  PostingID?: number;
}
