import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { TaitelComponent } from './taitel/taitel.component';
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { PersonsComponent } from './persons/persons.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {PersonService} from './persons/person.service'
import {DialogModule} from 'primeng/dialog';
import {TaitelService} from './taitel/taitel.service'
import {GMapModule} from 'primeng/gmap';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import {IdService} from './persons/id.service'
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import { AddNewComponent } from './add-new/add-new.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import {KeyFilterModule} from 'primeng/keyfilter';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
  declarations: [
    AppComponent,
    TaitelComponent,
    PersonsComponent,
    AddNewComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonModule,
    KeyFilterModule,
    DropdownModule,
    GMapModule,
    InputMaskModule,
    InputTextModule,
    ToolbarModule,
    AgmCoreModule,
    FileUploadModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [],
  providers: [TaitelComponent, TaitelService, PersonService, IdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
