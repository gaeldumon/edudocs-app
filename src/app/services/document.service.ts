import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ISendDocumentRequestBody} from "../interfaces/ISendDocumentRequestBody";
import {Observable} from "rxjs";
import {ISendDocumentResponse} from "../interfaces/ISendDocumentResponse";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) {
  }

  /**
   *
   * @param payload
   */
  sendDocument(payload: ISendDocumentRequestBody): Observable<ISendDocumentResponse> {
    return this.http.post<ISendDocumentResponse>("http://localhost:3000/send-document", payload)
  }
}
