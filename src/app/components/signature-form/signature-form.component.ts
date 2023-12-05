import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignatureFormModel } from '../../models/form.model';
import { FormDataService } from '../../services/form-data.service';
import { SignantService } from '../../services/signant.service';

@Component({
  selector: 'app-signature-form',
  templateUrl: './signature-form.component.html',
  styleUrls: ['./signature-form.component.css'],
})
export class SignatureFormComponent implements OnInit {
  signatureForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private signantService: SignantService
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
      // const pdfDocument: File = this.signatureForm.get('document')?.value;
      // const reader = new FileReader(); // @ts-ignore
      // const binaryData = reader.onload = (event) => {return event.target.result as ArrayBuffer};
      const formData: SignatureFormModel = {
        recipientName: this.signatureForm.get('recipientName')?.value,
        recipientEmail: this.signatureForm.get('recipientEmail')?.value,
        message: this.signatureForm.get('message')?.value,
        pdfDocument: this.signatureForm.get('document')?.value,
      };

      // Store the form data using the service
      this.formDataService.setFormData(formData);
      console.log(formData);

      // API call here
      const distributorID = 'DEV_WSTEST';
      const accessCode = 'DEVACCESSCODE';
      const title = 'Test Signature Posting';
      const description =
        'This is a test signature posting. For testing purposes only!';
      const activeTo = new Date('2023-12-31T23:59:59');
      const willBeDeletedDateTime = new Date('2023-12-31T23:59:59');
      const useWidget = true;
      const useWidgetOnAllPages = true;
      const postingAdmins = [
        {
          Name: 'Trym Grande',
          Email: 'trym.grande@gmail.com',
          MobileNumber: '40475830',
          NotifyByEmail: true,
          SSN: '0103993296',
        },
      ];
      const recipients = [
        {
          Name: 'Trym Grande',
          Email: 'trym.grande@gmail.com',
          MobileNumber: '40475830',
          NotifyByEmail: true,
        },
      ];
      const file = this.formDataService.getFormData()?.pdfDocument;
      const attachments = [
        {
          File: file,
          FileName: 'mock_file_name',
          Description: 'mock_file_description',
          ActionType: 'Sign',
        },
      ]; // TODO get actual file name
      const autoActivate = false;
      const senderName = 'Trym Grande';
      console.log('calling API');
      // call here
      this.signantService.createSignaturePosting(
        distributorID,
        accessCode,
        title,
        description,
        activeTo,
        willBeDeletedDateTime,
        useWidget,
        useWidgetOnAllPages,
        postingAdmins,
        recipients,
        attachments,
        autoActivate,
        senderName
      );

      console.log('API called');

      // reset the form after submission
      this.signatureForm.reset();
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
