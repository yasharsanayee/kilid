import {Injectable} from '@angular/core';
import {CoreService} from '../shared/service/core/core.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FilterResponseDTO} from '../shared/resources/filter-response-dto';

@Injectable({
  providedIn: 'root',
})
export class MainService extends CoreService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getFilterDataByParams(param: { searchType: string; city: string }): Observable<FilterResponseDTO> {
    return this.post<FilterResponseDTO, any>(`http://server.kilid.org/seo_legacy_api/url/decode/v2.0`, {
      url: `${param.searchType}/${param.city}`,
    });
  }
}
