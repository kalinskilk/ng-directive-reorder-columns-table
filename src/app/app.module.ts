import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReorderColumnTableDirective } from './reorder-column-table.directive';

@NgModule({
  declarations: [
    AppComponent,
    ReorderColumnTableDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
