import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignatureFormModel } from '../../models/form.model';
import { FormDataService } from '../../services/form-data.service';
import { SignantService } from '../../services/signant.service';
import { Router } from '@angular/router';

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
    private signantService: SignantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signatureForm = this.fb.group({
      recipientName: ['', Validators.required],
      recipientEmail: ['', [Validators.required, Validators.email]],
      message: [''],
      document: [null, Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.signatureForm.valid) {
      const formData: SignatureFormModel = {
        recipientName: this.signatureForm.get('recipientName')?.value,
        recipientEmail: this.signatureForm.get('recipientEmail')?.value,
        message: this.signatureForm.get('message')?.value, //@ts-ignore
        pdfDocument: this.formDataService.getFormData()?.pdfDocument,
      };

      // store form data for later use
      this.formDataService.setFormData(formData);
      console.log(formData);

      // prepare for signature posting creation request
      const distributorID = 'DEV_WSTEST';
      const accessCode = 'DEVACCESSCODE';
      const title = 'Test Signature Posting';
      const description = this.formDataService.getFormData().message;
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
          Name: this.formDataService.getFormData().recipientName,
          Email: this.formDataService.getFormData().recipientEmail,
          MobileNumber: '40475830',
          NotifyByEmail: true,
        },
      ];
      const file = this.formDataService.getFormData()?.pdfDocument;
      const attachments = [
        {
          File: file,
          FileName: 'mock_file_name',
          Description: description,
          ActionType: 'Sign',
        },
      ]; // TODO get actual file name
      const autoActivate = false;
      const senderName = 'Trym Grande';

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

      // reset the form after submission
      this.signatureForm.reset();
    }
  }

  onFileChange(event: any): void {
    const fileInput = event.target;
    const file = fileInput.files && fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (fileEvent) => {
        if (fileEvent.target) {
          const binaryData = fileEvent.target.result as ArrayBuffer;
          console.log(binaryData);
          this.formDataService.setPdfDocument(binaryData);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
