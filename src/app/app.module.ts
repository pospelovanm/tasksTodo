import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { routing } from "./app.routes";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { ItemsListComponent } from "./itemsList/items-list.component";
import {CommentsComponent} from "./comments/comments.component";
import {DataManager} from "./logic/DataManager";


@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [DataManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
