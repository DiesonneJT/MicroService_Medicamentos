import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';

@Injectable()
export class MedicamentosService {
  constructor(private readonly prisma: PrismaClient) {}

  async crear(dto: CreateMedicamentoDto) {
    const fecha = new Date(dto.fechaVencimiento);
    if (fecha <= new Date()) {
      throw new BadRequestException(
        'La fecha de vencimiento debe ser posterior a la fecha actual.',
      );
    }

    return this.prisma.medicamento.create({
      data: {
        nombreMedicamento: dto.nombreMedicamento,
        presentacion: dto.presentacion,
        lote: dto.lote,
        fechaVencimiento: fecha,
        cantidadDisponible: dto.cantidadDisponible,
        umbralMinimo: dto.umbralMinimo,
      },
    });
  }

  async listar() {
    return this.prisma.medicamento.findMany({
      orderBy: { nombreMedicamento: 'asc' },
    });
  }

  async aumentar(id: number, cantidad: number) {
    const medicamento = await this.prisma.medicamento.findUnique({ where: { id } });
    if (!medicamento) throw new NotFoundException('Medicamento no encontrado.');

    return this.prisma.medicamento.update({
      where: { id },
      data: { cantidadDisponible: { increment: cantidad } },
    });
  }

  async disminuir(id: number, cantidad: number) {
    return this.prisma.$transaction(async (tx) => {
      const actualizado = await tx.medicamento.updateMany({
        where: {
          id,
          cantidadDisponible: { gte: cantidad },
        },
        data: {
          cantidadDisponible: { decrement: cantidad },
        },
      });

      if (actualizado.count === 0) {
        const medicamento = await tx.medicamento.findUnique({ where: { id } });
        if (!medicamento) {
          throw new NotFoundException('Medicamento no encontrado.');
        }
        throw new ConflictException(
          `Stock insuficiente. Disponible: ${medicamento.cantidadDisponible}.`,
        );
      }

      return tx.medicamento.findUniqueOrThrow({ where: { id } });
    });
  }

  async proximosVencer() {
    const limite = new Date();
    limite.setDate(limite.getDate() + 30);

    return this.prisma.medicamento.findMany({
      where: {
        fechaVencimiento: {
          gte: new Date(),
          lte: limite,
        },
      },
      orderBy: { fechaVencimiento: 'asc' },
    });
  }

  async bajoStock() {
    return this.prisma.$queryRaw`
      SELECT *
      FROM "medicamentos"
      WHERE "cantidadDisponible" <= "umbralMinimo"
      ORDER BY "cantidadDisponible" ASC
    `;
  }
}
