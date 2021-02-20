import 'reflect-metadata';

import { ServerInfoFixtures } from '../../fixtures/domain/ServerInfoFixtures';
import { GetServerInfoNpmAdapter } from './GetServerInfoNpmAdapter';

describe(GetServerInfoNpmAdapter.name, () => {
  let getServerInfoNpmAdapter: GetServerInfoNpmAdapter;

  beforeAll(() => {
    getServerInfoNpmAdapter = new GetServerInfoNpmAdapter();
  });

  describe('.getServerInfo()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await getServerInfoNpmAdapter.getServerInfo();
      });

      it('should return ServerInfo', () => {
        expect(result).toStrictEqual(ServerInfoFixtures.withAnything);
      });
    });
  });
});
