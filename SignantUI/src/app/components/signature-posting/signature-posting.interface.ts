// TODO move to models
export interface SignaturePosting {
  activationUrl?: any;
  attachmentInfos?: any;
  message: string;
  errorCode: number;
  postingID: number;
  success: boolean;
  title: string;
  description: string;
  postingStatus?: string;
}
