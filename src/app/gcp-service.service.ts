import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError   } from 'rxjs';
import { tap, catchError, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GCPServiceService {
  private gcpUrl = "https://s3aws.blob.core.windows.net/uploads/dev-site/19/gcp_list.json"
  // private serverData = 'https://s3aws.blob.core.windows.net/uploads/dev-site/19/gcp_list.json';
  constructor(private http: HttpClient) {

  }
  // getData() {
  //   return this.http.get(this.serverData);
  // }
  getGcp(): Observable<any> {
    return this.http.get(this.gcpUrl).pipe(
      tap(status => console.log('fetched status'+ JSON.stringify(status))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    errorMessage = `An error ${err.error.message}`
    return throwError(errorMessage)
  }
  }

