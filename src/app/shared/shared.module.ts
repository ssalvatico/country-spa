import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/homePage/homePage.component';
import { AboutPageComponent } from './pages/aboutPage/aboutPage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContactPageComponent } from './pages/contactPage/contactPage.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AboutPageComponent,
    HomePageComponent,
    SidebarComponent,
    ContactPageComponent,
    SearchboxComponent,
    LoadingSpinnerComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HomePageComponent,
    AboutPageComponent,
    SidebarComponent,
    ContactPageComponent,
    SearchboxComponent,
    LoadingSpinnerComponent,
    PaginationComponent,
  ]
})
export class SharedModule {}
