import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignantService } from '../../services/signant.service';
import { Router } from '@angular/router';
import {
  Posting,
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

  posting: Posting = {
    title: 'Title',
    description: 'Description.',
    activeTo: new Date(new Date().setDate(new Date().getDate() + 30)),
    willBeDeletedDateTime: new Date(
      new Date().setDate(new Date().getDate() + 31)
    ),
    useWidget: true,
    autoActivate: true,
    attachments: [],
    recipients: [],
    postingAdmins: [],
  };

  constructor(
    private fb: FormBuilder,
    private signantService: SignantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addDefaultAdminAndRecipient();

    this.signatureForm = this.fb.group({
      recipientName: ['', Validators.required],
      recipientEmail: ['', [Validators.required, Validators.email]],
      message: [''],
      document: [null, Validators.required],
    });
  }

  addDefaultAdminAndRecipient() {
    // Adding default PostingAdmin
    const admin: PostingAdmin = {
      email: 'example@company.com',
      mobileNumber: '11000000',
      name: 'Ola Nordmann',
      notifyByEmail: true,
      ssn: '0000000000',
    };
    this.posting.postingAdmins.push(admin);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
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
          this.posting.attachments.push(attachment);
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
      // Adding Recipient
      const recipient: Recipient = {
        email: recipientEmail,
        mobileNumber: '12000000',
        name: recipientName,
        priority: 0,
        notifyByEmail: true,
      };
      this.posting.recipients.push(recipient);

      this.signantService.createPosting(this.posting);

      this.signatureForm.reset();
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
