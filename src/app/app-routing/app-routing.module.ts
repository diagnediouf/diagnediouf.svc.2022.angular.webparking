import { NgModule } from '@angular/core';
import {Routes,RouterModule} from "@angular/router";
import {AgencesComponent} from "../agences/agences.component";
import { AgentsComponent } from '../agents/agents.component';
import { AjoutVehiculeComponent } from '../ajout-vehicule/ajout-vehicule.component';
import { ClientsComponent } from '../clients/clients.component';
import { EditAgenceComponent } from '../edit-agence/edit-agence.component';
import { EditAgentComponent } from '../edit-agent/edit-agent.component';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { GaragesComponent } from '../garages/garages.component';
import {HomePageComponent} from "../home-page/home-page.component";
import { LoginComponent } from '../login/login.component';
import { NewAgenceComponent } from '../new-agence/new-agence.component';
import { NewAgentComponent } from '../new-agent/new-agent.component';
import { NewClientComponent } from '../new-client/new-client.component';
import { VehiculeDetailComponent } from '../vehicule-detail/vehicule-detail.component';
import { VehiculeComponent } from '../vehicule/vehicule.component';

const routes: Routes = [
  {
    path:"login",component:LoginComponent
  },
  {
    path:"garages",component:GaragesComponent
  },
  {
    path:"vehicule-detail/:url",component:VehiculeDetailComponent
  },
  {
    path:'home/:p1/:p2',component:HomePageComponent
  },
  {
    path:'', redirectTo:'home/1/0',pathMatch:'full'
  },
  {
    path:"vehicule",component:VehiculeComponent
    /*children:[
      {path:'',component:AjoutVehiculeComponent},
      {path:'edit/:id',component:AjoutVehiculeComponent}
    ]*/
  }, 
  {
    path:"agences",component:AgencesComponent
  },
  {
    path:"new-agence",component:NewAgenceComponent
  },
  {
    path:"edit-agence/:id",component:EditAgenceComponent
  },
  {
    path:"agents",component:AgentsComponent
  },
  {
    path:"new-agent",component:NewAgentComponent
  },
  {
    path:"edit-agent/:id",component:EditAgentComponent
  },
  {
    path:"clients",component:ClientsComponent
  },
  {
    path:"new-client",component:NewClientComponent
  },
  {
    path:"edit-client/:id",component:EditClientComponent
  },
 
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
