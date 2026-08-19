import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CantidadDto } from './dto/cantidad.dto';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { MedicamentosService } from './medicamentos.service';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly service: MedicamentosService) {}

  @Post()
  crear(@Body() dto: CreateMedicamentoDto) {
    return this.service.crear(dto);
  }

  @Get()
  listar() {
    return this.service.listar();
  }

  @Patch(':id/aumentar')
  aumentar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CantidadDto,
  ) {
    return this.service.aumentar(id, dto.cantidad);
  }

  @Patch(':id/disminuir')
  disminuir(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CantidadDto,
  ) {
    return this.service.disminuir(id, dto.cantidad);
  }

  @Get('proximos-vencer')
  proximosVencer() {
    return this.service.proximosVencer();
  }

  @Get('bajo-stock')
  bajoStock() {
    return this.service.bajoStock();
  }
}
