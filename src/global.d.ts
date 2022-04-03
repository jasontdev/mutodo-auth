import {PrismaClient} from '@prisma/client';

declare global {
    var prismaClient: PrismaClient;
    var databaseUrl: string;
    var jwtSecret: string;
}
