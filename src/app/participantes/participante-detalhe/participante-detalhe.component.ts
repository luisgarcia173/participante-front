import { catchError } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ParticipanteService } from '../service/participante.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  Validators,
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-participante-detalhe',
  standalone: true,
  providers: [provideNativeDateAdapter(), provideNgxMask()],
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    NgxMaskDirective
  ],
  templateUrl: './participante-detalhe.component.html',
  styleUrl: './participante-detalhe.component.scss',
})
export class ParticipanteDetalheComponent {
  isProcessing: boolean = false;

  participanteForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ParticipanteDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: ParticipanteService
  ) {
    this.createParticipanteForm();

    console.log(data);
    if (data?._id) {
      this.popularFormulario(data._id);
    }
  }

  createParticipanteForm() {
    this.participanteForm = this.formBuilder.group({
      id: new FormControl(''),
      nome : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      cpf : new FormControl('', [Validators.required]),
      sexo : new FormControl(''),
      estadoCivil : new FormControl(''),
      telefonePrimario : new FormControl('', [Validators.required]),
      telefoneSecundario : new FormControl(''),
      dataNascimento : new FormControl(''),
      status : new FormControl(true)
    });
  }

  popularFormulario(id: number){
    this.service.retrieveById(id)
      .subscribe(resp => {

        if (resp.dataNascimento) {
          const [day, month, year] = resp.dataNascimento.split('/')
          const parsedDate = new Date(+year, +month - 1, +day);
          console.log(parsedDate);
          this.participanteForm.controls['dataNascimento'].setValue(parsedDate);
        }

        this.participanteForm.controls['id'].setValue(resp.id);
        this.participanteForm.controls['nome'].setValue(resp.nome);
        this.participanteForm.controls['email'].setValue(resp.email);
        this.participanteForm.controls['cpf'].setValue(resp.cpf);
        this.participanteForm.controls['telefonePrimario'].setValue(resp.telefonePrimario);
        this.participanteForm.controls['telefoneSecundario'].setValue(resp.telefoneSecundario);
        this.participanteForm.controls['estadoCivil'].setValue(resp.estadoCivil);
        this.participanteForm.controls['sexo'].setValue(resp.sexo);
        this.participanteForm.controls['status'].setValue(resp.status);
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    const sourceDate = this.participanteForm.get('dataNascimento')?.value;
    if (sourceDate) {
      let formattedDate = formatDate(sourceDate, 'dd/MM/yyyy', 'en')
      this.participanteForm.controls['dataNascimento'].setValue(formattedDate);
    }

    this.isProcessing = true;

    const _id: number = this.participanteForm.get('id')?.value;
    const payload = this.participanteForm.value;

    if (_id) {
      this.service.update(_id, payload)
        .subscribe(() => {
          console.log('Atualizado com sucesso!');
          this.isProcessing = false;
          this.closeDialog();
        });
    } else {
      this.service.create(payload)
        .subscribe(() => {
          console.log('Criado com sucesso!');
          this.isProcessing = false;
          this.closeDialog();
        });
    }
  }

  confirm() {

  }
}
