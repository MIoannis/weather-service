import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from "@angular/material/button";

import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { HeaderComponent } from './header/header.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { RoundPipe } from './additional/round.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    HeaderComponent,
    MainpageComponent,
    SearchComponent,
    SettingsComponent,
    RoundPipe
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        environment.production ? [] : AkitaNgDevtools,
        AkitaNgRouterStoreModule,
        FormsModule,
        MatAutocompleteModule,
        FontAwesomeModule,
        MatRadioModule,
        MatButtonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
