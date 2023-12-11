// TODO move to models
export interface SignaturePostingResponse {
  success: boolean;
  message: string;
  errorCode: number;
  postingID: string;
  activationUrl?: any;
  attachmentInfos: any; // TODO use interface
  title: string;
  description: string;
  status: string;
}

// todo addd attachmentinfos interface

export interface attachmentInfo {
  description: string;
  fileName: string;
  groupId: string;
  attachmentId: string;
}
