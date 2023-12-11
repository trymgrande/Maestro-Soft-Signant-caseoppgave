import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SignaturePostingsService } from '../services/signature-postings.service';
import { Posting } from '../models/signant.models';
import { SignaturePostingResponse } from '../components/signature-posting/signature-posting.interface';
@Injectable({
  providedIn: 'root',
})
export class SignantService {
  private baseUrl = 'https://localhost:7168/api/Signant/';

  constructor(
    private http: HttpClient,
    private signaturePostingsService: SignaturePostingsService
  ) {}

  createPosting(posting: FormData) {
    return this.http.post(`${this.baseUrl}CreatePosting`, posting).subscribe(
      (response: any) => {
        console.log('CreatePosting response:', response);
        // add new list entry using form data
        const newPosting = {
          success: response.success,
          message: response.message,
          errorCode: response.errorCode,
          postingID: response.postingID,
          title: posting.get('title'),
          description: posting.get('description'),
          postingStatus: 'Sent',
          attachmentInfos: response.attachmentInfos,
        };

        this.signaturePostingsService.addSignaturePosting(newPosting);
        alert('Signature posting created successfully');
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getPostingStatus(postingId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}GetPostingStatus/${postingId}`);
  }

  downloadAttachment(
    postingId: string,
    attachmentId: string
  ): Observable<Blob> {
    return this.http.get(
      `${this.baseUrl}DownloadAttachment/${postingId}/${attachmentId}`,
      {
        responseType: 'blob', // This is important for file downloads
      }
    );
  }
}

// TODO move to models
interface PostingAdmin {
  Email: string;
  MobileNumber: string;
  Name: string;
  NotifyByEmail: boolean;
  SSN?: string;
}

interface Recipient {
  Email: string;
  MobileNumber: string;
  Name: string;
  Priority?: number;
  NotifyByEmail: boolean;
}

interface Attachment {
  ActionType: string;
  Description: string;
  File: any;
  FileName: string;
}
