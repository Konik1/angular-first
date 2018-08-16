import { Routes } from "@angular/router";
import { TaitelComponent } from "./taitel/taitel.component";
import { PersonsComponent} from "./persons/persons.component";
import { AddNewComponent } from './add-new/add-new.component';



export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: TaitelComponent
    },
    {
        path: "home/:id", 
        component: PersonsComponent
    },
    {
        path: "add", 
        component: AddNewComponent
    }
];