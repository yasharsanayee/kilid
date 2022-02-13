import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MainService} from '../main.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  private searchType: string;
  private city: string;

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
        console.clear();
        console.log('FilterData: ', value);
        debugger
        //TODO: fill search bar
      },
      error => {
        console.clear();
        console.log('FilterData Error: ', error);
        debugger
        //TODO: error loading search bar
      },
    );
  }

}
