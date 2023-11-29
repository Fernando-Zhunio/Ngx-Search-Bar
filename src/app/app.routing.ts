import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestLibraryComponent } from "./test-library/test-library/test-library.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "test-library",
        component: TestLibraryComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
}) export class AppRoutingModule { }

