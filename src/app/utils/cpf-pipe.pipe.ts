import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
  standalone: true
})
export class CpfPipe implements PipeTransform {

  transform(value: string): string {
    let valorFormatado = value + '';

    return valorFormatado = valorFormatado
            .padStart(11, '0')
            .slice(0, 11)
            .replace(/[^0-9]/, '')
            .replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                '$1.$2.$3-$4'
            );
  }

}
