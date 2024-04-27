import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ExamplesComponent } from './examples/examples.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThanksComponent } from './thanks/thanks.component'; 
import { MaintenanceComponent } from './maintenance/maintenance.component'; 

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ExamplesComponent,
    ServicesComponent,
    AboutComponent,
    ImpressumComponent,
    PrivacyComponent,
    ContactComponent,
    ThanksComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,MatOptionModule, MatSelectModule, MatIconModule, MatCheckboxModule, MatButtonModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
