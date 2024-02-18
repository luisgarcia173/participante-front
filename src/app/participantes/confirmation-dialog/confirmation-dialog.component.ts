import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ParticipanteService } from '../service/participante.service';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogContent, MatDialogActions, MatDividerModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  isProcessing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ParticipanteService){
  }

  closeDialog() {
    this.dialogRef.close();
  }

  confirm() {
    const _id: number = this.data['_id'];
    this.isProcessing = true;
    this.service.remove(_id)
      .subscribe(() => {
        console.log('Removido com sucesso!');
        this.isProcessing = false;
        this.closeDialog();
      });
  }

}
