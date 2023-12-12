import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignantService } from '../../services/signant.service';
import { Router } from '@angular/router';
import {
  SignaturePostingListElement,
  SignaturePostingResponse,
  PostingAdmin,
  Recipient,
  Attachment,
  ActionType,
} from '../../models/signant.models';
import { SECRETS } from '../../environment';
import { SignaturePostingsService } from '../../business-logic/signature-postings.service';

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
    private router: Router,
    private signaturePostingsService: SignaturePostingsService
  ) {}

  ngOnInit(): void {
    this.signatureForm = this.fb.group({
      recipientName: ['', Validators.required],
      recipientEmail: ['', [Validators.required, Validators.email]],
      message: [''],
      document: [null, Validators.required],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.attachment = {
      actionType: ActionType.Sign,
      description: 'Description of the file',
      file: file,
      fileName: file.name,
    };
  }

  onSubmit() {
    if (!this.signatureForm.valid) {
      alert('Please make sure input data is correct.');
      return;
    }

    const recipientName = this.signatureForm.get('recipientName')?.value ?? '';
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

    const postingAdmins: PostingAdmin[] = [
      {
        email: 'example@company.com',
        mobileNumber: '11000000',
        name: 'Ola Nordmann',
        notifyByEmail: true,
        ssn: '0000000000',
      },
    ];

    const formValues: any = {
      distributorId: SECRETS.distributorId,
      accessCode: SECRETS.AccessCode,
      title: 'Test Title',
      description: message,
      activeTo: new Date(new Date().setDate(new Date().getDate() + 30)),
      willBeDeletedDateTime: new Date(
        new Date().setDate(new Date().getDate() + 31)
      ),
      useWidget: true,
      autoActivate: true,

      postingAdmins: postingAdmins,
      recipients: [recipient],
      attachment: this.attachment,
    };

    const formData = new FormData();
    for (const key in formValues) {
      if (key !== 'file') {
        formData.append(key, JSON.stringify(formValues[key]));
      } else {
        formData.append(key, formValues[key]);
      }
    }
    formData.append('attachment[file]', this.attachment?.file);

    this.signantService
      .createPosting(formData)

      .subscribe(
        (response: SignaturePostingResponse) => {
          console.log('CreatePosting response:', response);

          // add new local list entry using form data
          const newPosting: SignaturePostingListElement = {
            success: response.success,
            message: response.message,
            errorCode: response.errorCode,
            postingID: response.postingID,
            title: (formData.get('title') as string).slice(1, -1) ?? '',
            description:
              (formData.get('description') as string).slice(1, -1) ?? '',
            status: 'Sent',
            attachmentInfos: response.attachmentInfos,
          };

          this.signaturePostingsService.addSignaturePosting(newPosting);
          alert('Signature posting created successfully');
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    this.signatureForm.reset();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
