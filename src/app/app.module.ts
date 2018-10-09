import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MyAppComponent } from './my-app/my-app.component';
import { HttpClientModule} from '@angular/common/http';
import { SlickModule } from 'ngx-slick';



@NgModule({
  declarations: [
    AppComponent,
    MyAppComponent,
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
