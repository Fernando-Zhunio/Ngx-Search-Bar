import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestLibraryComponent } from "./test-library/test-library/test-library.component";

const routes: Routes = [
    {
        path: "",
        component: TestLibraryComponent,
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
}) export class AppRoutingModule { }

