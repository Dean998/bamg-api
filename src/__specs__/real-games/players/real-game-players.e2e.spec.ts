import { HttpServer } from '@nestjs/common';
import * as request from 'supertest';
import { clearDb } from '../../db/db';
import {
  createPlayer,
  createRealGame,
  getPlayers,
  getRealGame,
  getRealGamePlayer,
  getRealGamePlayers,
  getRealGames,
  testRealGamePlayer,
} from '../../db/test-setup-db';
import { startTestApp, stopTestApp } from '../../db/setup';

const baseEndpoint = (realGameId: number) =>
  `/real-games/${realGameId}/players`;

describe(`${baseEndpoint}`, () => {
  let server: HttpServer;

  beforeAll(async () => {
    const app = await startTestApp();
    server = app.getHttpServer();
    await clearDb({});
  });

  afterAll(async () => {
    await stopTestApp();
  });

  describe(`POST`, () => {
    describe(`create a new real game player`, () => {
      it(`should create a new player in the db`, async () => {
        const { id: playerId } = await createPlayer();
        const { id: realGameId } = await createRealGame();

        return request(server)
          .post(baseEndpoint(realGameId))
          .send({
            ...testRealGamePlayer,
            playerId,
            realGameId,
          })
          .expect(201);
      });
    });
  });

  describe(`GET`, () => {
    describe(`when DB has entries`, () => {
      it('should return the entries', async () => {
        const realGames = await getRealGames();
        return request(server)
          .get(baseEndpoint(realGames[0].id))
          .expect(200)
          .expect((res) => expect(res.body.length).not.toBe(0));
      });
    });
  });

  describe(`/{id}`, () => {
    describe(`GET`, () => {
      describe(`when id is not found`, () => {
        it('should return 404 Not Found', async () => {
          const realGames = await getRealGames();

          return request(server)
            .get(`${baseEndpoint(realGames[0].id)}/1234`)
            .expect(404);
        });
      });
    });

    describe(`when id exists`, () => {
      it('should return the entry', async () => {
        const realGames = await getRealGames();
        const players = await getPlayers();

        return request(server)
          .get(`${baseEndpoint(realGames[0].id)}/${players[0].id}`)
          .expect(200);
      });
    });

    describe(`PATCH`, () => {
      it('should update the entry', async () => {
        const realGames = await getRealGames();
        const players = await getPlayers();

        return request(server)
          .patch(`${baseEndpoint(realGames[0].id)}/${players[0].id}`)
          .send({
            playerStats: { strength: 100 },
          })
          .expect(200);
      });
    });
  });

  describe(`Delete`, () => {
    it(`Should delete record in db`, async () => {
      const realGames = await getRealGames();
      const players = await getPlayers();

      await request(server)
        .delete(`${baseEndpoint(realGames[0].id)}/${players[0].id}`)
        .expect(200);

      const deletedRealGame = await getRealGamePlayer(realGames[0], players[0]);
      expect(deletedRealGame).toBe(null);
    });
  });
});
