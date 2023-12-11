import { Injectable } from '@angular/core';
import { SignaturePostingResponse } from '../components/signature-posting/signature-posting.interface';

// TODO move to forms?
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
      postingID: 'f75108a5-3daf-4514-ba0b-a6d0c8e2a264',
      title: 'Test Title',
      description: 'Test description.',
      status: 'Completed',
      attachmentInfos: [
        {
          attachmentID: '8fa80739-1e89-4716-bcbf-674c1c8137e1',
          description: 'pdf desc',
          fileName: 'Yr.pdf',
          groupID: '378583ad-6530-4c8a-932a-b311dfbc8143',
        },
      ],
    },
    {
      success: true,
      message: 'Test Message 2',
      errorCode: 0,
      postingID: 'fjdlksfj',
      title: 'Test Title 2',
      description: 'Test description 2.',
      status: 'Sent',
      attachmentInfos: 'attachmentInfos',
    },
  ];

  addSignaturePosting(posting: any): void {
    this.signaturePostings.push(posting);
  }

  getSignaturePostings(): SignaturePostingResponse[] {
    return this.signaturePostings;
  }

  setSignaturePostingStatus(postingID: string, postingStatus: number): void {
    let postingStatusReadableDict = {
      0: 'Sent',
      1: 'Completed',
      2: 'CompletedPartially',
      3: 'Expired',
    };

    let postingIndex = this.signaturePostings.findIndex(
      (posting) => posting.postingID === postingID
    );
    this.signaturePostings[postingIndex].status = //@ts-ignore
      postingStatusReadableDict[postingStatus];
  }

  getSignaturePosting(postingID: string): SignaturePostingResponse {
    //@ts-ignore
    return this.signaturePostings.filter(
      (posting) => posting.postingID == postingID
    )[0];
  }
}
