import { PrismaClient } from '@prisma/client';

export default function getPrismaClient() {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient();
  }

  if (global.prismaClient) {
    return global.prismaClient;
  }
  global.prismaClient = new PrismaClient();
  return global.prismaClient;
}
