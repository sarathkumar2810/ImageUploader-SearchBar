import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Camera } from '@ionic-native/camera/ngx';

import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule,],
  providers: [Camera,ImagePicker,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
