import { TestBed } from '@angular/core/testing';
import { SignaturePostingsService } from './signature-postings.service';
import { Status } from '../models/signant.models';

describe('SignaturePostingsService', () => {
  let service: SignaturePostingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignaturePostingsService);

    service['signaturePostings'] = [
      {
        success: true,
        message: 'OK',
        errorCode: 0,
        postingID: '2ff39c1b-e9f1-40a2-be45-c59fe009d198',
        title: '"Test Title"',
        description: '"fds"',
        attachmentInfos: [
          {
            attachmentID: 'b58c13c3-febd-4d22-8518-3f59e41a0520',
            description: '',
            fileName: 'Oslo (1).pdf',
            groupID: '852e2a9e-d9a4-4d74-ad1a-d017a9576192',
          },
        ],
        status: 'Sent',
      },
    ];
  });

  it('should update the status of a posting', () => {
    service.setSignaturePostingStatus(
      'f75108a5-3daf-4514-ba0b-a6d0c8e2a264',
      Status.Completed
    );

    expect(
      service.getSignaturePosting('f75108a5-3daf-4514-ba0b-a6d0c8e2a264').status
    ).toEqual('Completed');
  });
});
