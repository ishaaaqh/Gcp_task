import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MyAppComponent } from './my-app/my-app.component';
import { HttpClientModule} from '@angular/common/http';
import { SlickModule } from 'ngx-slick';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [
    AppComponent,
    MyAppComponent,
    MapComponent,
      ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SlickModule.forRoot()

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
