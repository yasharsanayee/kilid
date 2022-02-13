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
    this.activatedRoute.params
      .subscribe(
        value => {
          this.searchType = value.searchType;
          this.city = value.city;
          this.paramValidation();
        },
        error => console.error('ActivatedRoute Service Error: ', error));
  }

  private paramValidation() {
    if (this.searchType !== 'buy-apartment' && this.city !== 'tehran') {
      //TODO: redirect to 404 or something similar
    } else {
      this.getFilterData();
    }

  }

  private getFilterData() {
    //TODO: get initial filterData from provided api http://server.kilid.org/seo_legacy_api/url/decode/v2.0
  }
}
