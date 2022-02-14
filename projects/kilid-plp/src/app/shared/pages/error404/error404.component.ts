import {Component, OnInit} from '@angular/core';
import {Labels} from '../../consts/Labels';
import {Location} from '@angular/common';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
})
export class Error404Component implements OnInit {

  Labels = Labels;

  constructor(
    private location: Location,
  ) {
  }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }
}
