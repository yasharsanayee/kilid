import {Injectable} from '@angular/core';
import {CoreService} from '../shared/service/core/core.service';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {FilterResponseDTO} from '../shared/resources/filter-response-dto';
import {FilterResponseSearchDto} from '../shared/resources/filter-response-search-dto';

@Injectable({
  providedIn: 'root',
})
export class MainService extends CoreService {

  filterData: FilterResponseDTO = null;
  filterData$: Subject<FilterResponseDTO> = new Subject<FilterResponseDTO>();

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getFilterDataByParams(param: { searchType: string; city: string }) {
    this.post<FilterResponseDTO, FilterResponseSearchDto>(
      `http://server.kilid.org/seo_legacy_api/url/decode/v2.0`,
      {url: `${param.searchType}/${param.city}`},
    ).subscribe(
      value => {
        this.filterData = value;
        this.filterData$.next(this.filterData);
      },
      error => this.filterData$.error(error),
    );
  }


}
