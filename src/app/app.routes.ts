import { Routes, RouterModule } from '@angular/router';
import { ItemsListComponent } from "./itemsList/items-list.component";


const routes: Routes = [
  { path: '**',    component: ItemsListComponent }

];

export const routing = RouterModule.forRoot(routes);

