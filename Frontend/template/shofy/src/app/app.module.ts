import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/pages/shop/shop.component';
import { ShopModule } from './shop/shop.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddressComponent } from './address/address.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    AddressComponent
  ],
    imports: [
        SharedModule,
        ShopModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            progressBar: false,
            enableHtml: true,
            positionClass: 'toast-top-center'
        }),
        ReactiveFormsModule,
    ],
  exports:[
    ShopComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
