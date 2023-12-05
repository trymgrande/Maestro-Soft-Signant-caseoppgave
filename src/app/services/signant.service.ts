import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignantService {
  private signantApiUrl =
    'http://tempuri.org/IPostingsService/CreateSignPosting';

  constructor(private http: HttpClient) {}

  createSignaturePosting(
    distributorID: string,
    accessCode: string,
    // distributorSystemID: string,
    // consumerOrgNo: string,
    // consumerName: string,
    // consumerInvoiceInfo: string,
    // consumerOrderOrgNo: string,
    // consumerOrderOrgName: string,
    // consumerOrderInvoiceInfo: string,
    title: 'Test Signature Posting',
    description: 'This is a test signature posting. For testing purposes only!',
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
    const postData = {
      DistributorID: distributorID,
      AccessCode: accessCode,
      // DistributorSystemID: distributorSystemID,
      // ConsumerOrgNo: consumerOrgNo,
      // ConsumerName: consumerName,
      // ConsumerInvoiceInfo: consumerInvoiceInfo,
      // ConsumerOrderOrgNo: consumerOrderOrgNo,
      // ConsumerOrderOrgName: consumerOrderOrgName,
      // ConsumerOrderInvoiceInfo: consumerOrderInvoiceInfo,
      Title: title,
      Description: description,
      ActiveTo: activeTo,
      WillBeDeletedDateTime: willBeDeletedDateTime,
      UseWidget: useWidget,
      UseWidgetOnAllPages: useWidgetOnAllPages,
      // WidgetLocationDirection: widgetLocationDirection,
      PostingAdmins: postingAdmins,
      Recipients: recipients,
      Attachments: attachments,
      AutoActivate: autoActivate,
      SenderName: senderName,
    };

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
      SOAPAction: 'http://tempuri.org/IPostingsService/CreateSignPosting',
    });

    return this.http
      .post('https://test3.signant.no/WS/V1/PostingsService.svc', soapRequest, {
        headers,
      })
      .subscribe((response) => {
        console.log('SOAP Response:', response);
      });
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
