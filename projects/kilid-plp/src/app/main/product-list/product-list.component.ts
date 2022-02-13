import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MainService} from '../main.service';
import {FilterResponseDTO} from '../../shared/resources/filter-response-dto';
import {SeoPhrasesDTO} from '../../shared/resources/seo-phrases-dto';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  private searchType: string;
  private city: string;

  private filterResponse: FilterResponseDTO;
  private seoPhrases: SeoPhrasesDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      value => {
        this.searchType = value.searchType;
        this.city = value.city;
        this.paramValidation();
      },
      error => console.error('ActivatedRoute Service Error: ', error));
    this.subscribeToFilterData();
  }

  private paramValidation() {
    if (this.searchType !== 'buy-apartment' && this.city !== 'tehran') {
      //TODO: redirect to 404 or something similar
    } else {
      this.mainService.getFilterDataByParams(this.filterDataParams);
    }
  }

  get filterDataParams() {
    return {searchType: this.searchType, city: this.city};
  }

  private subscribeToFilterData() {
    this.mainService.filterData$.subscribe(
      value => {
        this.filterResponse = value;
        console.log('FilterData: ', value);
        //TODO: fill search bar
      },
      error => {
        console.error('FilterData Error: ', error);
        //TODO: error loading search bar
      },
    );
  }

}
