import {Injectable} from '@angular/core';
import {CoreService} from '../shared/service/core/core.service';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {FilterResponseDTO} from '../shared/resources/filter-response-dto';
import {SeoPhrasesDTO} from '../shared/resources/seo-phrases-dto';
import {PageParamsDTO} from '../shared/resources/page-params-dto';

@Injectable({
  providedIn: 'root',
})
export class MainService extends CoreService {

  filterData: FilterResponseDTO = null;
  filterData$: Subject<FilterResponseDTO> = new Subject<FilterResponseDTO>();

  seoPhrase: SeoPhrasesDTO = null;
  seoPhrase$: Subject<SeoPhrasesDTO> = new Subject<SeoPhrasesDTO>();

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getFilterDataByParams(params: PageParamsDTO) {
    this.post<FilterResponseDTO, { url: string }>(
      `http://server.kilid.org/seo_legacy_api/url/decode/v2.0`,
      {url: `${params.searchType}/${params.city}`},
    ).subscribe(
      value => {
        this.filterData = value;
        this.getCurrentFilterData();
      },
      error => this.filterData$.error(error),
    );
  }

  getSeoPhraseByParams(params: PageParamsDTO) {
    this.post<SeoPhrasesDTO, { url: string }>(
      `http://server.kilid.org/seo_legacy_api/url/seo/v2.0`,
      {url: `${params.searchType}/${params.city}`},
    ).subscribe(
      value => {
        this.seoPhrase = value;
        this.getCurrentSeoPhrase();
      },
      error => this.filterData$.error(error),
    );
  }

  getCurrentFilterData = () => this.filterData$.next(this.filterData);

  getCurrentSeoPhrase = () => this.seoPhrase$.next(this.seoPhrase);

}
