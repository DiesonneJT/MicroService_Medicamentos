-- CreateTable
CREATE TABLE "medicamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreMedicamento" TEXT NOT NULL,
    "presentacion" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "fechaVencimiento" DATETIME NOT NULL,
    "cantidadDisponible" INTEGER NOT NULL,
    "umbralMinimo" INTEGER NOT NULL,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "medicamentos_fechaVencimiento_idx" ON "medicamentos"("fechaVencimiento");

-- CreateIndex
CREATE INDEX "medicamentos_cantidadDisponible_idx" ON "medicamentos"("cantidadDisponible");

-- CreateIndex
CREATE INDEX "medicamentos_lote_idx" ON "medicamentos"("lote");
