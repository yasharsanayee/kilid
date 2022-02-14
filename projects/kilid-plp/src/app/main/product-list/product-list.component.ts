import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MainService} from '../main.service';
import {FilterResponseDTO} from '../../shared/resources/filter-response-dto';
import {SeoPhrasesDTO} from '../../shared/resources/seo-phrases-dto';
import {PageParamsDTO} from '../../shared/resources/page-params-dto';
import {Title} from '@angular/platform-browser';
import {Labels} from '../../shared/consts/Labels';
import {PageStatus} from '../../shared/resources/page-status.enum';
import {AdDTO} from '../../shared/resources/ad-dto';
import {PageableResponseDTO} from '../../shared/resources/pageable-response-dto';
import {isPlatformBrowser} from '@angular/common';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {

  onDestroy$: Subject<void> = new Subject();

  Labels = Labels;

  pageDescription: string;
  private searchType: string;
  private city: string;

  private seoPhrases: SeoPhrasesDTO;
  filterResponse: FilterResponseDTO;
  listData: AdDTO[];

  searchStatus: PageStatus = PageStatus.loading;
  listStatus: PageStatus = PageStatus.loading;

  get PageStatus() {
    return PageStatus;
  }

  isServer: boolean;

  constructor(
    private activatedRouteService: ActivatedRoute,
    private mainService: MainService,
    private titleService: Title,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: any,
  ) {
    this.isServer = !isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.subscribeToFilterResponse();
    this.subscribeToSeoPhrase();
    this.subscribeToListData();
    this.activatedRouteService.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        value => {
          this.searchType = value.searchType;
          this.city = value.city;
          this.paramValidation();
        },
        error => console.error('ActivatedRoute Service Error:x ', error));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private paramValidation() {
    if (this.searchType !== 'buy-apartment' || this.city !== 'tehran') {
      this.router.navigateByUrl('/404');
    } else {
      this.mainService.getFilterDataByParams(this.pageParams());
      this.mainService.getSeoPhraseByParams(this.pageParams());
    }
  }

  private pageParams(): PageParamsDTO {
    return {searchType: this.searchType, city: this.city};
  }

  private subscribeToFilterResponse() {
    this.mainService.filterResponse$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        value => this.setFilterResponse(value),
        error => {
          console.error('FilterData Error: ', error);
          //TODO: error loading search bar
        },
      );
  }

  private subscribeToSeoPhrase() {
    this.mainService.seoPhrase$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        value => this.setSeoData(value),
        error => {
          console.error('SeoPhrase Error: ', error);
          //TODO: set SEO data
        },
      );
  }

  private subscribeToListData() {
    this.mainService.listData$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        value => this.setListData(value),
        error => console.error('ListData Error: ', error),
      );
  }

  private setSeoData(seoPhrase: SeoPhrasesDTO) {
    this.seoPhrases = seoPhrase;
    this.titleService.setTitle(this.seoPhrases.title);
    this.pageDescription = this.seoPhrases.titleToShow;
  }

  private setFilterResponse(filterResponse: FilterResponseDTO) {
    this.searchStatus = PageStatus.resolved;
    this.filterResponse = filterResponse;
    // if (!this.isServer) {
    this.getDataList();
    // }
  }

  private setListData(value: PageableResponseDTO<AdDTO>) {
    this.listData = value.content.filter(c => c['image'] && c['image'].url && c['title']);
    this.listStatus = this.PageStatus.resolved;
  }

  togglePropertyType(key: string) {
    if (this.filterResponse.filters[key]) {
      delete this.filterResponse.filters[key];
    } else {
      this.filterResponse.filters[key] = true;
    }
  }

  isPropertySelected(key: string): boolean {
    return !!this.filterResponse.filters[key];
  }

  getDataList() {
    this.mainService.getListDataByFilterResponse(this.filterResponse.filters);
  }

  onScroll() {
    this.getDataList();
  }


}
