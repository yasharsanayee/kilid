import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MainService} from '../main.service';
import {FilterResponseDTO} from '../../shared/resources/filter-response-dto';
import {SeoPhrasesDTO} from '../../shared/resources/seo-phrases-dto';
import {PageParamsDTO} from '../../shared/resources/page-params-dto';
import {Title} from '@angular/platform-browser';
import {Labels} from '../../shared/consts/Labels';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  Labels = Labels;

  pageDescription: string;

  private searchType: string;
  private city: string;

  filterResponse: FilterResponseDTO;
  private seoPhrases: SeoPhrasesDTO;

  constructor(
    private activatedRouteService: ActivatedRoute,
    private mainService: MainService,
    private titleService: Title,
  ) {
  }

  ngOnInit(): void {
    this.activatedRouteService.params.subscribe(
      value => {
        this.searchType = value.searchType;
        this.city = value.city;
        this.paramValidation();
      },
      error => console.error('ActivatedRoute Service Error: ', error));
    this.subscribeToFilterResponse();
    this.subscribeToSeoPhrase();
  }

  private paramValidation() {
    if (this.searchType !== 'buy-apartment' && this.city !== 'tehran') {
      //TODO: redirect to 404 or something similar
    } else {
      this.mainService.getFilterDataByParams(this.pageParams());
      this.mainService.getSeoPhraseByParams(this.pageParams());
    }
  }

  private pageParams(): PageParamsDTO {
    return {searchType: this.searchType, city: this.city};
  }

  private subscribeToFilterResponse() {
    this.mainService.filterResponse$.subscribe(
      value => this.setFilterResponse(value),
      error => {
        console.error('FilterData Error: ', error);
        //TODO: error loading search bar
      },
    );
  }

  private subscribeToSeoPhrase() {
    this.mainService.seoPhrase$.subscribe(
      value => this.setSeoData(value),
      error => {
        console.error('SeoPhrase Error: ', error);
        //TODO: set SEO data
      },
    );
  }

  private setSeoData(seoPhrase: SeoPhrasesDTO) {
    this.seoPhrases = seoPhrase;
    this.titleService.setTitle(this.seoPhrases.title);
    this.pageDescription = this.seoPhrases.titleToShow;
  }

  private setFilterResponse(filterResponse: FilterResponseDTO) {
    this.filterResponse = filterResponse;
  }

}
