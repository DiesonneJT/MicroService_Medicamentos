import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class CantidadDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  cantidad!: number;
}
