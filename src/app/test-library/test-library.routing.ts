import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestLibraryComponent } from './test-library/test-library.component';

const routes: Routes = [
  {
    path: 'test-library',
    component: TestLibraryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) export class TestLibraryRoutes { }