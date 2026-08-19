import { CantidadDto } from './dto/cantidad.dto';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { MedicamentosService } from './medicamentos.service';
export declare class MedicamentosController {
    private readonly service;
    constructor(service: MedicamentosService);
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
    aumentar(id: number, dto: CantidadDto): Promise<{
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
    disminuir(id: number, dto: CantidadDto): Promise<{
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
