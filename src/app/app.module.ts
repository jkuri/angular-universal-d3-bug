import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TransferHttpModule } from '@angularclass/universal-transfer-state/browser';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    TransferHttpModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
  declarations: [ AppComponent ],
  exports: [ AppComponent ]
})
export class AppModule {}
