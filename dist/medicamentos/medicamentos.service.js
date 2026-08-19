"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicamentosService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let MedicamentosService = class MedicamentosService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async crear(dto) {
        const fecha = new Date(dto.fechaVencimiento);
        if (fecha <= new Date()) {
            throw new common_1.BadRequestException('La fecha de vencimiento debe ser posterior a la fecha actual.');
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
    async aumentar(id, cantidad) {
        const medicamento = await this.prisma.medicamento.findUnique({ where: { id } });
        if (!medicamento)
            throw new common_1.NotFoundException('Medicamento no encontrado.');
        return this.prisma.medicamento.update({
            where: { id },
            data: { cantidadDisponible: { increment: cantidad } },
        });
    }
    async disminuir(id, cantidad) {
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
                    throw new common_1.NotFoundException('Medicamento no encontrado.');
                }
                throw new common_1.ConflictException(`Stock insuficiente. Disponible: ${medicamento.cantidadDisponible}.`);
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
        return this.prisma.$queryRaw `
      SELECT *
      FROM "medicamentos"
      WHERE "cantidadDisponible" <= "umbralMinimo"
      ORDER BY "cantidadDisponible" ASC
    `;
    }
};
exports.MedicamentosService = MedicamentosService;
exports.MedicamentosService = MedicamentosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], MedicamentosService);
//# sourceMappingURL=medicamentos.service.js.map