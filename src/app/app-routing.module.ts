import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ExamplesComponent } from './examples/examples.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ServicesComponent } from './services/services.component';
import { StartComponent } from './start/start.component';
import { ThanksComponent } from './thanks/thanks.component';


const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  {
    path: 'examples',
    component: ExamplesComponent,
    data:{footer:false}
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'impressum',
    component: ImpressumComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'thanks',
    component: ThanksComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
