import getPrismaClient from './prisma-client';

export interface Identity {
  id?: string;
  email: string;
  role: string;
  password: string;
}

export const identityRepository = {
  save: async (identity: Identity) => {
    const { password, email, role } = identity;
    const prismaClient = getPrismaClient();
    const createdIdentity = await prismaClient.identity.create({
      data: {
        email,
        role,
        password
      },
      select: {
        id: true,
        email: true,
        role: true
      }
    });
    return createdIdentity;
  },
  findByEmail: async (email: string) => {
    const prismaClient = getPrismaClient();
    return prismaClient.identity.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        email: true,
        role: true,
        password: true
      }
    });
  }
};
