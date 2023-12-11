export interface PostingAdmin {
  email: string;
  mobileNumber: string;
  name: string;
  notifyByEmail: boolean;
  ssn: string;
}

export interface Recipient {
  email: string;
  mobileNumber: string;
  name: string;
  priority: number;
  notifyByEmail: boolean;
}

export interface Attachment {
  actionType: string; // TODO ActionType.Sign?
  description: string;
  file: any;
  fileName: string;
}

export interface Posting {
  title: string;
  description: string;
  activeTo: Date;
  willBeDeletedDateTime: Date;
  useWidget: boolean;
  autoActivate: boolean;
  attachments: Attachment[];
  recipients: Recipient[];
  postingAdmins: PostingAdmin[];
}
