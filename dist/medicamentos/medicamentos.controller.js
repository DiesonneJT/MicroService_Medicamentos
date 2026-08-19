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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicamentosController = void 0;
const common_1 = require("@nestjs/common");
const cantidad_dto_1 = require("./dto/cantidad.dto");
const create_medicamento_dto_1 = require("./dto/create-medicamento.dto");
const medicamentos_service_1 = require("./medicamentos.service");
let MedicamentosController = class MedicamentosController {
    constructor(service) {
        this.service = service;
    }
    crear(dto) {
        return this.service.crear(dto);
    }
    listar() {
        return this.service.listar();
    }
    aumentar(id, dto) {
        return this.service.aumentar(id, dto.cantidad);
    }
    disminuir(id, dto) {
        return this.service.disminuir(id, dto.cantidad);
    }
    proximosVencer() {
        return this.service.proximosVencer();
    }
    bajoStock() {
        return this.service.bajoStock();
    }
};
exports.MedicamentosController = MedicamentosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medicamento_dto_1.CreateMedicamentoDto]),
    __metadata("design:returntype", void 0)
], MedicamentosController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MedicamentosController.prototype, "listar", null);
__decorate([
    (0, common_1.Patch)(':id/aumentar'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, cantidad_dto_1.CantidadDto]),
    __metadata("design:returntype", void 0)
], MedicamentosController.prototype, "aumentar", null);
__decorate([
    (0, common_1.Patch)(':id/disminuir'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, cantidad_dto_1.CantidadDto]),
    __metadata("design:returntype", void 0)
], MedicamentosController.prototype, "disminuir", null);
__decorate([
    (0, common_1.Get)('proximos-vencer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MedicamentosController.prototype, "proximosVencer", null);
__decorate([
    (0, common_1.Get)('bajo-stock'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MedicamentosController.prototype, "bajoStock", null);
exports.MedicamentosController = MedicamentosController = __decorate([
    (0, common_1.Controller)('medicamentos'),
    __metadata("design:paramtypes", [medicamentos_service_1.MedicamentosService])
], MedicamentosController);
//# sourceMappingURL=medicamentos.controller.js.map