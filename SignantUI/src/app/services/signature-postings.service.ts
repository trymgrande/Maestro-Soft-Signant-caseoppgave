import { Injectable } from '@angular/core';
import { SignaturePostingResponse } from '../components/signature-posting/signature-posting.interface';
@Injectable({
  providedIn: 'root',
})
export class SignaturePostingsService {
  private signaturePostings: SignaturePostingResponse[] = [
    // TODO convert to SignaturePostingResponse[]
    // contains some test data for demonstration purposes
    {
      success: true,
      message: 'Test Message',
      errorCode: 1,
      postingID: 'fjdslkj',
      title: 'Test Title',
      description: 'Test description.',
      postingStatus: 'Completed',
    },
    {
      success: true,
      message: 'Test Message 2',
      errorCode: 0,
      postingID: 'fjdlksfj',
      title: 'Test Title 2',
      description: 'Test description 2.',
      postingStatus: 'Sent',
    },
  ];

  addSignaturePosting(posting: any): void {
    this.signaturePostings.push(posting);
  }

  getSignaturePostings(): SignaturePostingResponse[] {
    return this.signaturePostings;
  }

  setSignaturePostingStatus(postingID: string, postingStatus: string): void {
    let postingIndex = this.signaturePostings.findIndex(
      (posting) => posting.postingID === postingID
    );
    this.signaturePostings[postingIndex].postingStatus = postingStatus;
  }

  getSignaturePosting(postingID: string): SignaturePostingResponse {
    //@ts-ignore
    return this.signaturePostings.filter(
      (posting) => posting.postingID === postingID
    );
  }
}
