import { Injectable } from '@angular/core';
import { SignaturePostingResponse } from '../components/signature-posting/signature-posting.interface';

// TODO move to forms?
@Injectable({
  providedIn: 'root',
})
export class SignaturePostingsService {
  private readonly storageKey = 'signaturePostings';

  // TODO convert to SignaturePostingResponse[]
  private signaturePostings: SignaturePostingResponse[] = [];

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    const storedPostings = localStorage.getItem(this.storageKey);
    if (storedPostings) {
      this.signaturePostings = JSON.parse(storedPostings);
    }
  }

  addSignaturePosting(posting: any): void {
    this.signaturePostings.push(posting);
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.signaturePostings)
    );
  }

  getSignaturePostings(): SignaturePostingResponse[] {
    return this.signaturePostings;
  }

  setSignaturePostingStatus(postingID: string, postingStatus: number): void {
    const postingStatusReadable = {
      0: 'Sent',
      1: 'Completed',
      2: 'CompletedPartially',
      3: 'Expired',
    };

    let postingIndex = this.signaturePostings.findIndex(
      (posting) => posting.postingID === postingID
    );
    this.signaturePostings[postingIndex].status = //@ts-ignore
      postingStatusReadable[postingStatus];

    this.updateLocalStorage();
  }

  getSignaturePosting(postingID: string): SignaturePostingResponse {
    //@ts-ignore
    return this.signaturePostings.filter(
      (posting) => posting.postingID == postingID
    )[0];
  }
}
