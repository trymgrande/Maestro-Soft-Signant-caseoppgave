import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { SignatureFormComponent } from './components/signature-form/signature-form.component';
import { SignantService } from './services/signant.service';
import { AppRoutingModule } from './app-routing.module';
import { FormDataService } from './services/form-data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SignatureFormComponent,
    SignatureFormComponent,
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],

  providers: [SignantService, FormDataService],
})
export class AppModule {
  ngDoBootstrap(app: import('@angular/core').ApplicationRef): void {
    app.bootstrap(AppComponent);
  }
}
