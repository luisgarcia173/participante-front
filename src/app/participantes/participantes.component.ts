import { Component, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ParticipanteService } from './service/participante.service';
import { Observable } from 'rxjs';
import { Participante } from './model/participante';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ParticipanteDetalheComponent } from './participante-detalhe/participante-detalhe.component';
import { CpfPipe } from '../utils/cpf-pipe.pipe';

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    ConfirmationDialogComponent,
    CpfPipe
  ],
  templateUrl: './participantes.component.html',
  styleUrl: './participantes.component.scss',
  providers: [],
})
export class ParticipantesComponent {

  participantes$: Observable<Participante[]>;

  constructor(private service: ParticipanteService, public dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) {
    this.participantes$ = this.service.list();
  }

  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'cpf',
    'status',
    'acoes',
  ];

  editar(id: number) {
    let dialogRef = this.dialog.open(ParticipanteDetalheComponent, {
      width: '650px',
      data: {'_id': id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.participantes$ = this.service.list();
      this.changeDetectorRef.detectChanges();
    });
  }

  remover(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {_id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.participantes$ = this.service.list();
      this.changeDetectorRef.detectChanges();
    });
  }

  novo() {
    let dialogRef = this.dialog.open(ParticipanteDetalheComponent, {
      width: '650px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.participantes$ = this.service.list();
      this.changeDetectorRef.detectChanges();
    });
  }
}
