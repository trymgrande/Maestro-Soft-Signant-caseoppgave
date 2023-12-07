import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignatureFormComponent } from './components/signature-form/signature-form.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: 'signature-form', component: SignatureFormComponent },
  { path: '', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
