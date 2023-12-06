export interface SignaturePosting {
  success: boolean;
  message: string;
  errorCode: number;
  postingID: number;
  title: string;
  description: string;
  postingStatus?: string;
}
