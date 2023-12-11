import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignantService } from '../../services/signant.service';
import { Router } from '@angular/router';
import {
  PostingAdmin,
  Recipient,
  Attachment,
} from '../../models/signant.models';
@Component({
  selector: 'app-signature-form',
  templateUrl: './signature-form.component.html',
  styleUrls: ['./signature-form.component.css'],
})
export class SignatureFormComponent implements OnInit {
  signatureForm!: FormGroup;

  attachment?: Attachment = undefined;

  constructor(
    private fb: FormBuilder,
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      // TODO remove unused code
      let formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('file.test', 'teststring');

      const reader = new FileReader();
      reader.onload = (fileEvent) => {
        if (fileEvent.target) {
          // const binaryData = fileEvent.target.result as ArrayBuffer;
          // console.log(binaryData);

          const attachment: Attachment = {
            actionType: 'Sign',
            description: 'Description of the file',
            file: file,
            fileName: file.name,
          };
          this.attachment = attachment;
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  onSubmit() {
    if (this.signatureForm.valid || true) {
      // TODO remove true

      const recipientName =
        this.signatureForm.get('recipientName')?.value ?? '';
      const recipientEmail =
        this.signatureForm.get('recipientEmail')?.value ?? '';
      const message = this.signatureForm.get('message')?.value ?? '';

      const recipient: Recipient = {
        email: recipientEmail,
        mobileNumber: '12000000',
        name: recipientName,
        priority: 0,
        notifyByEmail: true,
      };

      const formValues = {
        title: 'Title',
        description: 'Description.',
        activeTo: new Date(new Date().setDate(new Date().getDate() + 30)),
        willBeDeletedDateTime: new Date(
          new Date().setDate(new Date().getDate() + 31)
        ),
        useWidget: true,
        autoActivate: true,

        postingAdmins: [
          {
            email: 'example@company.com',
            mobileNumber: '11000000',
            name: 'Ola Nordmann',
            notifyByEmail: true,
            ssn: '0000000000',
          },
        ],
        recipients: [recipient],
        attachment: this.attachment,
      };

      const formData = new FormData();
      for (const key in formValues) {
        //@ts-ignore
        if (key !== 'file') {
          //@ts-ignore
          formData.append(key, JSON.stringify(formValues[key]));
        } else {
          //@ts-ignore
          formData.append(key, formValues[key]);
        }
      }
      console.log(formData.get('attachments'));

      formData.append('attachment[file]', this.attachment?.file);

      console.log(formData.get('attachments'));

      this.signantService.createPosting(formData);

      this.signatureForm.reset();
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
