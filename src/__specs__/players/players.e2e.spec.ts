import { HttpServer } from '@nestjs/common';
import * as request from 'supertest';
import { startTestApp, stopTestApp } from '../setup';

const baseEndpoint = '/players';

describe(`${baseEndpoint}`, () => {
  let server: HttpServer;

  beforeAll(async () => {
    const app = await startTestApp();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await stopTestApp();
  });

  describe(`GET`, () => {
    describe(`when DB has entries`, () => {
      it('should return the entries', async () => {
        return request(server)
          .get(baseEndpoint)
          .expect(200)
          .expect((res) => expect(res.body.length).not.toBe(0));
      });
    });
  });

  describe(`/{id}`, () => {
    describe(`GET`, () => {
      describe(`when id is not found`, () => {
        it('should return 404 Not Found', async () => {
          return request(server).get(`${baseEndpoint}/1234`).expect(404);
        });
      });

      // describe(`when id exists`, () => {
      //   it('should return the entry', async () => {
      //     card = await createCard({
      //       athleteId,
      //       collectionId,
      //       positionId,
      //       retailerId,
      //     });
      //     return request(server)
      //       .get(`${baseEndpoint}/${card.id}`)
      //       .expect(200)
      //       .expect((res) => {
      //         expect(res.body).toEqual(stringifyDates(card));
      //       });
      //   });
      // });
    });
  });
});
