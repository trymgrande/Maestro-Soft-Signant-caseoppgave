import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignantService {
  private signantApiUrl =
    'https://test3.signant.no/WS/V1/PostingsService.svc?wsdl';

  constructor(private http: HttpClient) {}

  createSignaturePosting(data: any): Observable<any> {
    return this.http.post(`${this.signantApiUrl}/CreateSignPosting`, data);
  }

  checkPostingStatus(postingId: string): Observable<any> {
    return this.http.get(`${this.signantApiUrl}/GetPostingStatus/${postingId}`);
  }
}
