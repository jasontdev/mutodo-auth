import getPrismaClient from './prisma-client';

export interface Identity {
  id?: string;
  email: string;
  role: string;
  password: string;
  salt: string;
}

export const identityRepository = {
  save: async (identity: Identity) => {
    const { password, email, role, salt } = identity;
    const prismaClient = getPrismaClient();
    const createdIdentity = await prismaClient.identity.create({
      data: {
        email,
        role,
        password,
        salt
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
        salt: true,
        password: true
      }
    });
  }
};
