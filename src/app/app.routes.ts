import { Routes } from '@angular/router';

import { CampaignList } from './pages/campaign-list/campaign-list';

import { CampaignForm } from './pages/campaign-form/campaign-form';

import { AiGenerator } from './pages/ai-generator/ai-generator';

import { JourneyBuilder } from './pages/journey-builder/journey-builder';

export const routes: Routes = [

{
path:'',
redirectTo:'campaigns',
pathMatch:'full'
},

{
path:'campaigns',
component:CampaignList
},

{
path:'campaigns/new',
component:CampaignForm
},

{
path:'campaigns/edit/:id',
component:CampaignForm
},

{
path:'ai-generator',
component:AiGenerator
},

{
path:'journeys',
component:JourneyBuilder
},

{
path:'**',
redirectTo:'campaigns'
}

];