import { Injectable } from '@angular/core';
import { SignatureFormModel } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData: SignatureFormModel | null = null;

  setFormData(data: SignatureFormModel) {
    this.formData = { ...data };
  }

  getFormData(): SignatureFormModel | null {
    return this.formData;
  }
}
