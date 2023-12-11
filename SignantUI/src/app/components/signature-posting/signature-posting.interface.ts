// TODO move to models
export interface SignaturePostingResponse {
  activationUrl?: any;
  attachmentInfos?: any;
  message: string;
  errorCode: number;
  postingID: string;
  success: boolean;
  title: string;
  description: string;
  postingStatus?: string;
}
