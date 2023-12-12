import { Injectable } from '@angular/core';
import { SignaturePostingListElement } from '../models/signant.models';
import { Status } from '../models/signant.models';
@Injectable({
  providedIn: 'root',
})
export class SignaturePostingsService {
  private readonly storageKey = 'signaturePostings';

  private signaturePostings: SignaturePostingListElement[] = [];

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    const storedPostings = localStorage.getItem(this.storageKey);
    if (storedPostings) {
      this.signaturePostings = JSON.parse(storedPostings);
    }
  }

  addSignaturePosting(posting: SignaturePostingListElement): void {
    this.signaturePostings.push(posting);
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.signaturePostings)
    );
  }

  getSignaturePostings(): SignaturePostingListElement[] {
    return this.signaturePostings;
  }

  setSignaturePostingStatus(postingID: string, postingStatus: Status): void {
    let postingIndex = this.signaturePostings.findIndex(
      (posting) => posting.postingID === postingID
    );
    if (postingIndex !== -1) {
      this.signaturePostings[postingIndex].status = Status[postingStatus];
      this.updateLocalStorage();
    }
  }

  getSignaturePosting(postingID: string): SignaturePostingListElement {
    return this.signaturePostings.filter(
      (posting) => posting.postingID == postingID
    )[0];
  }
}
