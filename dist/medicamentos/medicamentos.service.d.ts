import { PrismaClient } from '@prisma/client';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
export declare class MedicamentosService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    crear(dto: CreateMedicamentoDto): Promise<{
        nombreMedicamento: string;
        presentacion: string;
        lote: string;
        fechaVencimiento: Date;
        cantidadDisponible: number;
        umbralMinimo: number;
        creadoEn: Date;
        actualizadoEn: Date;
        id: number;
    }>;
    listar(): Promise<{
        nombreMedicamento: string;
        presentacion: string;
        lote: string;
        fechaVencimiento: Date;
        cantidadDisponible: number;
        umbralMinimo: number;
        creadoEn: Date;
        actualizadoEn: Date;
        id: number;
    }[]>;
    aumentar(id: number, cantidad: number): Promise<{
        nombreMedicamento: string;
        presentacion: string;
        lote: string;
        fechaVencimiento: Date;
        cantidadDisponible: number;
        umbralMinimo: number;
        creadoEn: Date;
        actualizadoEn: Date;
        id: number;
    }>;
    disminuir(id: number, cantidad: number): Promise<{
        nombreMedicamento: string;
        presentacion: string;
        lote: string;
        fechaVencimiento: Date;
        cantidadDisponible: number;
        umbralMinimo: number;
        creadoEn: Date;
        actualizadoEn: Date;
        id: number;
    }>;
    proximosVencer(): Promise<{
        nombreMedicamento: string;
        presentacion: string;
        lote: string;
        fechaVencimiento: Date;
        cantidadDisponible: number;
        umbralMinimo: number;
        creadoEn: Date;
        actualizadoEn: Date;
        id: number;
    }[]>;
    bajoStock(): Promise<unknown>;
}
