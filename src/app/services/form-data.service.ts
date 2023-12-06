import { Injectable } from '@angular/core';
import { SignatureFormModel } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private static formData: SignatureFormModel = {
    recipientName: '',
    recipientEmail: '',
    message: '',
    pdfDocument: null,
  };

  setFormData(data: SignatureFormModel) {
    FormDataService.formData = { ...data };
  }

  getFormData(): SignatureFormModel {
    return FormDataService.formData;
  }

  setPdfDocument(pdfDocument: any) {
    FormDataService.formData.pdfDocument = pdfDocument;
  }

  setPostingID(postingID: number) {
    FormDataService.formData.PostingID = postingID;
  }
}
