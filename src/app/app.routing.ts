import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestLibraryComponent } from "./test-library/test-library/test-library.component";

const routes: Routes = [
    {
        path: 'test/test-library',
        component: TestLibraryComponent,
    },
    {
        path: 'test/test-library',
        pathMatch: 'full',
        redirectTo: 'test/test-library'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
}) export class AppRoutingModule { }

