import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { TitleTrimmerPipe } from '../app/titleTrimmer.pipe';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { VideoItemComponent } from './video-item/video-item.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    VideoItemComponent,
    TitleTrimmerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
