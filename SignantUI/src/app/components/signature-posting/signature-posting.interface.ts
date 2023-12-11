// TODO move to models
export interface SignaturePostingResponse {
  success: boolean;
  message: string;
  errorCode: number;
  postingID: string;
  activationUrl?: any;
  attachmentInfos: any;
  title: string;
  description: string;
  postingStatus?: string;
}
