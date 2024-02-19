import { HttpServer } from '@nestjs/common';
import * as request from 'supertest';
import { startTestApp, stopTestApp } from '../db/setup';
import { clearDb } from '../db/db';
import { getPlayer, getPlayers } from '../db/players-db';
import { CreatedPlayerDto } from 'src/players/dto';

const baseEndpoint = '/players';

const testPlayer = {
  playerOptaId: 'Should stay the same ',
  firstName: 'Hi',
  lastName: 'Doe',
  position: 'Midfielder',
  optaPosition: 'MID',
  teamOptaId: 'hello',
  attack: 7.5,
  defense: 6.2,
  strength: 8.1,
  impact: 7,
  skills: 7.8,
  scoring: 6.5,
};

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
    describe(`create a new player`, () => {
      it(`should create a new player in the db`, async () => {
        return request(server).post(baseEndpoint).send(testPlayer).expect(201);
      });
    });
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

      describe(`when id exists`, () => {
        it('should return the entry', async () => {
          const player = await getPlayers();

          return request(server)
            .get(`${baseEndpoint}/${player[0].id}`)
            .expect(200);
        });

        describe(`PATCH`, () => {
          it('should update the entry', async () => {
            const player = await getPlayers();
            return request(server)
              .patch(`${baseEndpoint}/${player[0].id}`)
              .send({
                firstName: 'Test',
                lastName: 'Data',
              })
              .expect(200);
          });

          it(`Should not update other details in player`, async () => {
            const player = await getPlayers();
            return request(server)
              .patch(`${baseEndpoint}/${player[0].id}`)
              .send({
                firstName: 'Test',
                lastName: 'Data',
                playerOptaId: 'should not update field',
              })
              .expect(200)
              .expect((res) =>
                expect(res.body.playerOptaId).toBe(testPlayer.playerOptaId),
              );
          });
        });
      });
    });
    describe(`Delete`, () => {
      it(`Should delete record in db`, async () => {
        const player = await getPlayers();
        await request(server)
          .delete(`${baseEndpoint}/${player[0].id}`)
          .expect(200);

        const deletedPlayer = await getPlayer(player[0].id);
        expect(deletedPlayer).toBe(null);
      });
    });
  });
});
