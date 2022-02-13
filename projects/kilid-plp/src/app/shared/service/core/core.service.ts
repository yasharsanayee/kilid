import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class CoreService {

  protected constructor(private httpClient: HttpClient) {
  }

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url, {
      observe: 'response',
      responseType: 'json',
    }).pipe(map(value => value.body));
  }

  getByResponse<T>(url: string): Observable<HttpResponse<T>> {
    return this.httpClient.get<T>(url, {
      observe: 'response',
      responseType: 'json',
    });
  }

  post<T, D>(url: string, body: D): Observable<T> {
    return this.httpClient.post<T>(url, body, {
      observe: 'response',
      responseType: 'json',
    }).pipe(map(value => value.body));
  }

  postByResponse<T, D>(url: string, body: D): Observable<HttpResponse<T>> {
    return this.httpClient.post<T>(url, body, {
      observe: 'response',
      responseType: 'json',
    });
  }

}
