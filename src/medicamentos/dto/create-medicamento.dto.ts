import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateMedicamentoDto {
  @IsString()
  @IsNotEmpty()
  nombreMedicamento!: string;

  @IsString()
  @IsNotEmpty()
  presentacion!: string;

  @IsString()
  @IsNotEmpty()
  lote!: string;

  @IsDateString()
  fechaVencimiento!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  cantidadDisponible!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  umbralMinimo!: number;
}
