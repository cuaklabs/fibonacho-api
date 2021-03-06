import 'reflect-metadata';

jest.mock('fs');

import fs from 'fs';

import { TypeGuard } from '../../../common/modules/TypeGuard';
import { PackageInfoNpm } from '../../../npm/models/npm/PackageInfoNpm';
import { ServerInfoFixtures } from '../../fixtures/domain/ServerInfoFixtures';
import { GetServerInfoNpmAdapter } from './GetServerInfoNpmAdapter';
import { PackageInfoNpmFixtures } from '../../../npm/fixtures/npm/PackageInfoNpmFixtures';

describe(GetServerInfoNpmAdapter.name, () => {
  let packageInfoNpmTypeGuard: jest.Mocked<TypeGuard<PackageInfoNpm>>;

  let getServerInfoNpmAdapter: GetServerInfoNpmAdapter;

  beforeAll(() => {
    packageInfoNpmTypeGuard = ({
      is: jest.fn().mockReturnValue(true) as unknown,
    } as Partial<TypeGuard<PackageInfoNpm>>) as jest.Mocked<
      TypeGuard<PackageInfoNpm>
    >;

    getServerInfoNpmAdapter = new GetServerInfoNpmAdapter(
      packageInfoNpmTypeGuard,
    );
  });

  describe('.getServerInfo()', () => {
    beforeAll(() => {
      (fs.readFileSync as jest.Mock).mockReturnValue(
        Buffer.from(JSON.stringify(PackageInfoNpmFixtures.withAny)),
      );
    });

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
