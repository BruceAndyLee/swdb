import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { GreetingComponent } from './greeting/greeting.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'greeting', component: GreetingComponent },
  { path: 'entry', component: EntryComponent },
  { path: '', redirectTo: 'greeting', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
