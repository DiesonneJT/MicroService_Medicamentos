import { OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaModule implements OnModuleDestroy {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    onModuleDestroy(): Promise<void>;
}
