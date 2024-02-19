import prisma from './setup';

interface clearDbProps {
  table?: string;
  schemaname?: string;
}

export const clearDb = async ({
  table,
  schemaname = 'public',
}: clearDbProps) => {
  const tablenames = table
    ? [{ tablename: table }]
    : await prisma.$queryRaw<
        Array<{ tablename: string }>
      >`SELECT tablename FROM pg_tables WHERE schemaname=${schemaname}`;

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "${schemaname}"."${tablename}" CASCADE;`,
        );
      } catch (error) {
        console.log({ error });
      }
    }
  }
};
