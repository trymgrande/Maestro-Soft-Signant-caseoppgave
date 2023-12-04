import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignatureFormModel } from '../../models/form.model';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-signature-form',
  templateUrl: './signature-form.component.html',
  styleUrls: ['./signature-form.component.css'],
})
export class SignatureFormComponent implements OnInit {
  signatureForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.signatureForm = this.fb.group({
      recipientName: ['', Validators.required],
      recipientEmail: ['', [Validators.required, Validators.email]],
      message: [''],
      document: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signatureForm.valid) {
      const formData: SignatureFormModel = {
        recipientName: this.signatureForm.get('recipientName')?.value,
        recipientEmail: this.signatureForm.get('recipientEmail')?.value,
        message: this.signatureForm.get('message')?.value,
        pdfDocument: this.signatureForm.get('document')?.value,
      };

      // Store the form data using the service
      this.formDataService.setFormData(formData);
      console.log(formData);
      console.log('--');

      // Optionally, make API call here using formData

      // Reset the form after submission
      this.signatureForm.reset();

      console.log(this.formDataService.getFormData());
    }
  }

  onFileChange(event: any): void {
    const fileInput = event.target;
    const file = fileInput.files && fileInput.files[0];

    if (file) {
      console.log(file);
    }
  }
}
