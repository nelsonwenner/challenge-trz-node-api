import { Server } from '@src/Server';

let server: Server;

describe('When start app', () => {
  afterEach(async () => await server.getServer()?.close());

  test('Should return a server instance app', async () => {
    server = new Server();
    await server.init();
    server.start();
    expect(!!server.getServer()).toBe(true);
  });
});
