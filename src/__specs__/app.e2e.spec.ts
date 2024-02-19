import { HttpServer } from '@nestjs/common';
import * as request from 'supertest';

import { startTestApp, stopTestApp } from './db/setup';

describe('AppController (e2e)', () => {
  let server: HttpServer;

  beforeAll(async () => {
    const app = await startTestApp();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await stopTestApp();
  });

  it('/ (GET)', () => {
    return request(server).get('/').expect(200).expect('Hello World!');
  });
});
