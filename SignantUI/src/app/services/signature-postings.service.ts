import { Injectable } from '@angular/core';
import { SignaturePosting } from '../components/signature-posting/signature-posting.interface';
@Injectable({
  providedIn: 'root',
})
export class SignaturePostingsService {
  private signaturePostings: SignaturePosting[] = [
    // contains some test data for demonstration purposes
    {
      success: true,
      message: 'Test Message',
      errorCode: 1,
      postingID: 1,
      title: 'Test Title',
      description: 'Test description.',
      postingStatus: 'Completed',
    },
    {
      success: true,
      message: 'Test Message 2',
      errorCode: 0,
      postingID: 2,
      title: 'Test Title 2',
      description: 'Test description 2.',
      postingStatus: 'Sent',
    },
  ];

  addSignaturePosting(posting: SignaturePosting): void {
    this.signaturePostings.push(posting);
  }

  getSignaturePostings(): SignaturePosting[] {
    return this.signaturePostings;
  }

  setSignaturePostingStatus(postingID: number, postingStatus: string): void {
    let postingIndex = this.signaturePostings.findIndex(
      (posting) => posting.postingID === postingID
    );
    this.signaturePostings[postingIndex].postingStatus = postingStatus;
  }

  getSignaturePosting(postingID: number): SignaturePosting {
    //@ts-ignore
    return this.signaturePostings.filter(
      (posting) => posting.postingID === postingID
    );
  }
}
