import {Injectable} from '@angular/core';
import {CoreService} from '../core/core.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export abstract class CrudService extends CoreService {

  abstract entityName: string;

  protected constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  searchByPost<T, D>(url: string, body: D) {
    return this.post<T, D>(`${this.entityName}/${url}`, body);
  }

  getAll<T>(url) {
    return this.get<T>(`${this.entityName}/${url}`);
  }

  //TODO: other stuff

}
