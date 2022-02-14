import {Injectable} from '@angular/core';
import {CoreService} from '../shared/service/core/core.service';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {FilterResponseDTO} from '../shared/resources/filter-response-dto';
import {SeoPhrasesDTO} from '../shared/resources/seo-phrases-dto';
import {PageParamsDTO} from '../shared/resources/page-params-dto';
import {FilterDTO} from '../shared/resources/filter-dto';
import {AdDTO} from '../shared/resources/ad-dto';
import {PageableResponseDTO} from '../shared/resources/pageable-response-dto';
import {makeStateKey, TransferState} from '@angular/platform-browser';

const STATE_KEY_FILTERS = makeStateKey('filters');
const STATE_KEY_SEO = makeStateKey('seo');

@Injectable({
  providedIn: 'root',
})
export class MainService extends CoreService {

  filterResponse: FilterResponseDTO = null;
  filterResponse$: Subject<FilterResponseDTO> = new Subject<FilterResponseDTO>();

  seoPhrase: SeoPhrasesDTO = null;
  seoPhrase$: Subject<SeoPhrasesDTO> = new Subject<SeoPhrasesDTO>();

  listData: PageableResponseDTO<AdDTO>;
  listData$: Subject<any> = new Subject<any>();
  listDataPage: number = 0;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getFilterDataByParams(params: PageParamsDTO) {
    this.post<FilterResponseDTO, { url: string }>(
      `http://server.kilid.org/seo_legacy_api/url/decode/v2.0`,
      {url: `${params.searchType}/${params.city}`},
    ).subscribe(
      value => {
        this.filterResponse = value;
        this.getCurrentFilterData();
      },
      error => this.filterResponse$.error(error),
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
      error => this.filterResponse$.error(error),
    );
  }

  getListDataByFilterResponse(filter: FilterDTO) {
    this.post<PageableResponseDTO<AdDTO>, FilterDTO>(
      `http://server.kilid.org/api/listing/search/portal/v2.0?sort=date,DESC${this.getListDataPageParam()}`,
      filter,
    ).subscribe(
      value => {
        if (!this.listData) {
          this.listData = value;
        } else {
          this.listData.content = [...this.listData.content, ...value.content];
        }
        this.getCurrentListData();
      },
      error => this.filterResponse$.error(error),
    );
  }

  private getListDataPageParam(): string {
    if (this.listData && !this.listData.lastPage) {
      this.listDataPage++;
      return `&page=${this.listDataPage}`;
    }
    return '';
  }

  getCurrentFilterData = () => this.filterResponse$.next(this.filterResponse);

  getCurrentSeoPhrase = () => this.seoPhrase$.next(this.seoPhrase);

  getCurrentListData = () => this.listData$.next(this.listData);
}

