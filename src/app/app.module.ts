import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingComponent } from './greeting/greeting.component';
import { EntryComponent } from './entry/entry.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NoInfoPipe } from './no-info.pipe';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent,
    EntryComponent,
    PageNotFoundComponent,
    NoInfoPipe,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
