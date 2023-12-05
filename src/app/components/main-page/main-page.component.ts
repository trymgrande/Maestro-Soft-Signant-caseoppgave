import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignantService } from '../../services/signant.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  postingStatus: string = '';

  constructor(private router: Router, private signantService: SignantService) {}

  ngOnInit(): void {}

  navigateToSignatureForm(): void {
    this.router.navigate(['/signature-form']);
  }

  getPostingStatus(): void {
    this.signantService
      .getPostingStatus('DEV_WSTEST', 'DEVACCESSCODE', 1)
      .subscribe(
        (response: any) => {
          this.postingStatus = response.Status;

          console.log('Posting Status:', this.postingStatus);
          alert('Posting Status: ' + this.postingStatus);
        },
        (error: any) => {
          console.error('Error getting posting status:', error);
          alert('Error getting posting status: ' + error);
        }
      );
  }

  downloadFile(): void {
    if (this.postingStatus === 'Completed') {
      this.signantService
        .downloadAttachment('DEV_WSTEST', 'DEVACCESSCODE', 1)
        .subscribe(
          (downloadedFile: any) => {
            console.log('Downloaded File:', downloadedFile);
            alert('Downloaded File: ' + downloadedFile);
          },
          (error) => {
            console.error('Error downloading file:', error);
            alert('Error downloading file: ' + error);
          }
        );
    } else {
      console.warn('File cannot be downloaded. Posting status is not signed.');
      alert('File cannot be downloaded. Posting status is not "completed".');
    }
  }
}
