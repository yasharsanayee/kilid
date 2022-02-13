import {Injectable} from '@angular/core';
import {CoreService} from '../shared/service/core/core.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MainService extends CoreService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getFilterDataByParams(param: { searchType: string; city: string }) {
    return this.post<any, any>(`http://server.kilid.org/seo_legacy_api/url/decode/v2.0`, {
      url: `${param.searchType}/${param.city}`,
    });
  }
}
