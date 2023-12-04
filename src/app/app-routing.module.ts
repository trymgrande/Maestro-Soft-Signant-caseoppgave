import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignatureFormComponent } from './components/signature-form/signature-form.component';

const routes: Routes = [
  { path: 'signature-form', component: SignatureFormComponent },
  // TODO: add routes here if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
