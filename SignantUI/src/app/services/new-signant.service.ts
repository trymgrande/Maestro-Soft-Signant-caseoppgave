// signant.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posting } from '../models/signant.models';

@Injectable({
  providedIn: 'root',
})
export class SignantService {
  constructor(private http: HttpClient) {}

  createPosting(posting: Posting) {
    return this.http.post('/api/signant/createposting', posting);
  }
}
