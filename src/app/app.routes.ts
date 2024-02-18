import { Routes } from '@angular/router';
import { ParticipantesComponent } from './participantes/participantes.component';
import { ParticipanteDetalheComponent } from './participantes/participante-detalhe/participante-detalhe.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'participantes'},
  {path: 'participantes', component: ParticipantesComponent},
  //{path: 'participante', component: ParticipanteDetalheComponent},
  { path: '**', component: ParticipantesComponent }
];
