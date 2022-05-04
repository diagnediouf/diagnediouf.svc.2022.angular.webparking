import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { AgencesComponent } from './agences/agences.component';
import { HomePageComponent } from './home-page/home-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AgentsComponent } from './agents/agents.component';
import { NewAgenceComponent } from './new-agence/new-agence.component';
import { EditAgenceComponent } from './edit-agence/edit-agence.component';
import { NewAgentComponent } from './new-agent/new-agent.component';
import { EditAgentComponent } from './edit-agent/edit-agent.component';
import { NewClientComponent } from './new-client/new-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ClientsComponent } from './clients/clients.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { LoginComponent } from './login/login.component';
import { VehiculeDetailComponent } from './vehicule-detail/vehicule-detail.component';
import { GaragesComponent } from './garages/garages.component';
import { CatalogueService } from './catalogue.service';
import { AjoutVehiculeComponent } from './ajout-vehicule/ajout-vehicule.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AgencesComponent,
    HomePageComponent,
    AgentsComponent,
    NewAgenceComponent,
    EditAgenceComponent,
    NewAgentComponent,
    EditAgentComponent,
    NewClientComponent,
    EditClientComponent,
    ClientsComponent,
    VehiculeComponent,
    LoginComponent,
    VehiculeDetailComponent,
    GaragesComponent,
    AjoutVehiculeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, HttpClientModule,
    ReactiveFormsModule,MatSliderModule,BrowserAnimationsModule,
    MatSelectModule

  ],
  providers: [CatalogueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
