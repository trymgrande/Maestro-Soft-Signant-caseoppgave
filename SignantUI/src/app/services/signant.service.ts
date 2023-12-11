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
        console.log('Response:', response);
        // add new list entry using form data
        const newPosting = {
          success: response.success,
          message: response.message,
          errorCode: response.errorCode,
          postingID: response.postingID,
          title: posting.get('title'),
          description: posting.get('description'),
          postingStatus: '', // not yet available TODO make default 'Sent'?
        };

        this.signaturePostingsService.addSignaturePosting(newPosting);
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

  // newGetPostingStatus(posting: Posting, postingId: number) {
  //   return this.http.get(
  //     `https://localhost:7168/api/Signant/GetPostingStatus/${postingId}`,
  //     posting
  //   );
  // }

  createSignaturePostingOld(
    distributorID: string,
    accessCode: string,
    // distributorSystemID: string,
    // consumerOrgNo: string,
    // consumerName: string,
    // consumerInvoiceInfo: string,
    // consumerOrderOrgNo: string,
    // consumerOrderOrgName: string,
    // consumerOrderInvoiceInfo: string,
    title: string,
    description: string,
    activeTo: Date,
    willBeDeletedDateTime: Date,
    useWidget: boolean,
    useWidgetOnAllPages: boolean,
    // widgetLocationDirection: string,
    postingAdmins: PostingAdmin[],
    recipients: Recipient[],
    attachments: Attachment[],
    autoActivate: boolean,
    senderName: string
  ) {
    const soapRequest = `
    <soapenv:Envelope
      xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
      xmlns:tem="http://tempuri.org/"
    >
      <soapenv:Header/>
      <soapenv:Body>
        <tem:CreateSignPosting>
          <tem:DistributorID>${distributorID}</tem:DistributorID>
          <tem:AccessCode>${accessCode}</tem:AccessCode>
          <tem:Title>${title}</tem:Title>
          <tem:Description>${description}</tem:Description>
          <tem:ActiveTo>${activeTo.toISOString()}</tem:ActiveTo>
          <tem:WillBeDeletedDateTime>${willBeDeletedDateTime.toISOString()}</tem:WillBeDeletedDateTime>
          <tem:UseWidget>${useWidget}</tem:UseWidget>
          <tem:UseWidgetOnAllPages>${useWidgetOnAllPages}</tem:UseWidgetOnAllPages>
          <tem:PostingAdmins>${postingAdmins
            .map(
              (admin) => `
          <tem:PostingAdmin>
            <tem:Email>${admin.Email}</tem:Email>
            <tem:MobileNumber>${admin.MobileNumber}</tem:MobileNumber>
            <tem:Name>${admin.Name}</tem:Name>
            <tem:NotifyByEmail>${admin.NotifyByEmail}</tem:NotifyByEmail>
            <tem:SSN>${admin.SSN || ''}</tem:SSN>
          </tem:PostingAdmin>
        `
            )
            .join('')}</tem:PostingAdmins>
          <tem:Recipients>${recipients
            .map(
              (recipient) => `
          <tem:Recipient>
            <tem:Email>${recipient.Email}</tem:Email>
            <tem:MobileNumber>${recipient.MobileNumber}</tem:MobileNumber>
            <tem:Name>${recipient.Name}</tem:Name>
            <tem:Priority>${recipient.Priority || 0}</tem:Priority>
            <tem:NotifyByEmail>${recipient.NotifyByEmail}</tem:NotifyByEmail>
          </tem:Recipient>
        `
            )
            .join('')}</tem:Recipients>
          <tem:Attachments>${attachments
            .map(
              (attachment) => `
              <tem:Attachment>
                <tem:ActionType>${attachment.ActionType}</tem:ActionType>
                <tem:Description>${attachment.Description}</tem:Description>
                <tem:File>${attachment.File}</tem:File>
                <tem:FileName>${attachment.FileName}</tem:FileName>
              </tem:Attachment>
            `
            )
            .join('')}</tem:Attachments>
          <tem:AutoActivate>${autoActivate}</tem:AutoActivate>
          <tem:SenderName>${senderName}</tem:SenderName>
        </tem:CreateSignPosting>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      SOAPAction: 'CreateSignPosting',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'POST',
    });

    const options = { headers: headers };

    return this.http
      .post(
        'https://test3.signant.no/WS/V1/PostingsService.svc',
        soapRequest,
        options
      )
      .subscribe(
        (response: any) => {
          console.log('SOAP Response:', response);
          window.alert('Success: Signature posting created successfully.');

          // add new list entry using form data
          const newPosting = {
            success: response.success,
            message: response.message,
            errorCode: response.errorCode,
            postingID: response.PostingID,
            title: title,
            description: description,
            postingStatus: '', // not yet available
          };

          this.signaturePostingsService.addSignaturePosting(newPosting);
        },
        (error) => {
          console.error('SOAP Error:', error);
          window.alert(
            'Error: Signature posting was not created successfully.'
          );
        }
      );
  }

  getPostingStatusOld(
    distributorID: string,
    accessCode: string,
    postingID: string
  ): Observable<any> {
    const soapRequest = `
      <soapenv:Envelope
        xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:tem="http://tempuri.org/"
      >
        <soapenv:Header/>
        <soapenv:Body>
          <tem:GetPostingStatus>
            <tem:DistributorID>${distributorID}</tem:DistributorID>
            <tem:AccessCode>${accessCode}</tem:AccessCode>
            <tem:PostingID>${postingID}</tem:PostingID>
          </tem:GetPostingStatus>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      SOAPAction: 'GetPostingStatus',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'POST',
    });

    const options = { headers: headers };

    return this.http.post(
      'https://test3.signant.no/WS/V1/PostingsService.svc',
      soapRequest,
      options
    );
  }

  downloadAttachmentOld(
    distributorID: string,
    accessCode: string,
    postingID: string
  ): Observable<any> {
    const soapRequest = `
      <soapenv:Envelope
        xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:tem="http://tempuri.org/"
      >
        <soapenv:Header/>
        <soapenv:Body>
          <tem:DownloadAttachment>
            <tem:DistributorID>${distributorID}</tem:DistributorID>
            <tem:AccessCode>${accessCode}</tem:AccessCode>
            <tem:PostingID>${postingID}</tem:PostingID>
          </tem:DownloadAttachment>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      SOAPAction: 'DownloadAttachment',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'POST',
    });

    const options = { headers: headers };

    return this.http.post(
      'https://test3.signant.no/WS/V1/PostingsService.svc',
      soapRequest,
      options
    );
  }
}

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
