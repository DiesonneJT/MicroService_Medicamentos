import { Module } from '@nestjs/common';
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, MedicamentosModule],
})
export class AppModule {}
