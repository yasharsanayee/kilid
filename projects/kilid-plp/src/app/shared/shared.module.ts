import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './comps/loader/loader.component';
import { Error404Component } from './pages/error404/error404.component';



@NgModule({
  declarations: [
    LoaderComponent,
    Error404Component,
  ],
  exports: [
    LoaderComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class SharedModule { }
