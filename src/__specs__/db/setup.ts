import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { AppModule } from '../../app.module';

let app: INestApplication;

export const startTestApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
  return app;
};

export const stopTestApp = async () => {
  return app.close();
};
// eslint-disable-next-line prefer-const
let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}
// eslint-disable-next-line prefer-const
prisma = global.prisma;

export default prisma;
