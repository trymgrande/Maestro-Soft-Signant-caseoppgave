import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignaturePostingsService } from '../business-logic/signature-postings.service';

import {
  SignaturePostingListElement,
  SignaturePostingResponse,
} from '../models/signant.models';
@Injectable({
  providedIn: 'root',
})
export class SignantService {
  baseUrl = 'https://localhost:7168/api/Signant/';

  constructor(
    private http: HttpClient,
    private signaturePostingsService: SignaturePostingsService
  ) {}

  createPosting(posting: FormData): Observable<SignaturePostingResponse> {
    return this.http.post<SignaturePostingResponse>(
      `${this.baseUrl}CreatePosting`,
      posting
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
        responseType: 'blob',
      }
    );
  }
}
