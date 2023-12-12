import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignantService } from '../../services/signant.service';
import { SignaturePostingsService } from '../../business-logic/signature-postings.service';
import { SignaturePostingListElement } from '../../models/signant.models';
import { PostingStatusResponse } from '../../models/signant.models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  signaturePostings: SignaturePostingListElement[] = [];

  constructor(
    private router: Router,
    private signantService: SignantService,
    private signaturePostingsService: SignaturePostingsService
  ) {}

  ngOnInit(): void {
    this.signaturePostings =
      this.signaturePostingsService.getSignaturePostings();
  }

  navigateToSignatureForm(): void {
    this.router.navigate(['/signature-form']);
  }

  getPostingStatus(postingID: string): void {
    this.signantService.getPostingStatus(postingID).subscribe(
      (response: PostingStatusResponse) => {
        this.signaturePostingsService.setSignaturePostingStatus(
          postingID,
          response.status
        );
        alert('Posting status updated');
      },
      (error: HttpErrorResponse) => {
        console.error('Error getting posting status:', error);
        alert('Error getting posting status: ' + error);
      }
    );
  }

  downloadFile(postingID: string, attachmentId: string): void {
    if (
      this.signaturePostingsService.getSignaturePosting(postingID).status ==
      'Completed'
    ) {
      this.signantService.downloadAttachment(postingID, attachmentId).subscribe(
        (downloadedFile: Blob) => {
          const blob = new Blob([downloadedFile], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);

          // Create a link to download
          const a = document.createElement('a');
          a.href = url;
          a.download = `Signed_document_${attachmentId}`;
          document.body.appendChild(a);
          a.click();

          // Clean up
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        },
        (error) => {
          console.error('Error downloading file:', error);
          alert('Error downloading file: ' + error);
        }
      );
    } else {
      alert('File cannot be downloaded. Posting status is not "Completed".');
    }
  }
}
