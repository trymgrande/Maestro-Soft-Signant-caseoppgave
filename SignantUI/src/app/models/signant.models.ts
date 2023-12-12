export interface SignaturePosting {
  distributorId: string;
  accessCode: string;
  title: string;
  description: string;
  activeTo: Date;
  willBeDeletedDateTime: Date;
  useWidget: boolean;
  postingAdmins: PostingAdmin[];
  recipients: Recipient[];
  attachments: Attachment[];
  autoActivate: boolean;
}

export interface PostingAdmin {
  name: string;
  email: string;
  mobileNumber: string;
  ssn: string;
  notifyByEmail: boolean;
}

export interface Recipient {
  name: string;
  email: string;
  mobileNumber?: string;
  priority?: number;
  notifyByEmail: boolean;
}

export interface Attachment {
  file: any;
  fileName: string;
  description: string;
  actionType: ActionType;
}

export interface AttachmentInfo {
  description: string;
  fileName: string;
  groupID: string;
  attachmentID: string;
}

export interface SignaturePostingResponse {
  success: boolean;
  message: string;
  errorCode: number;
  postingID: string;
  activationUrl?: string;
  attachmentInfos: AttachmentInfo[];
}

export interface SignaturePostingListElement
  extends Omit<SignaturePostingResponse, 'activationUrl'> {
  title: string;
  description: string;
  status: string;
}

export interface PostingStatusResponse {
  success: boolean;
  message: string;
  errorCode: number;
  postingId: string;
  status: Status;
}

export enum Status {
  Sent = 0,
  Completed = 1,
  CompletedPartially = 2,
  Expired = 3,
}

export enum ActionType {
  Sign = 2,
  Read = 1,
}
