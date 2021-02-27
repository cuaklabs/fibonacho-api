import 'reflect-metadata';

import { PackageInfoNpmFixtures } from '../../fixtures/npm/PackageInfoNpmFixtures';
import { PackageInfoNpmTypeGuard } from './PackageInfoNpmTypeGuard';

describe('PackageInfoNpmTypeGuard', () => {
  let packageInfoNpmTypeGuard: PackageInfoNpmTypeGuard;

  beforeAll(() => {
    packageInfoNpmTypeGuard = new PackageInfoNpmTypeGuard();
  });

  describe('.is()', () => {
    describe('having a value respecting the PackageInfoNpm contract', () => {
      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = packageInfoNpmTypeGuard.is(PackageInfoNpmFixtures.withAny);
        });

        it('should return true', () => {
          expect(result).toBe(true);
        });
      });
    });

    describe('having a value NOT respecting the PackageInfoNpm contract', () => {
      describe('when called', () => {
        let result1: unknown;
        let result2: unknown;
        let result3: unknown;

        beforeAll(() => {
          result1 = packageInfoNpmTypeGuard.is(PackageInfoNpmFixtures.withAny.toString());
          result2 = packageInfoNpmTypeGuard.is([PackageInfoNpmFixtures.withAny]);
          result3 = packageInfoNpmTypeGuard.is(undefined);
        });

        it('should return false', () => {
          expect(result1).toBe(false);
          expect(result2).toBe(false);
          expect(result3).toBe(false);
        });
      });
    });
  })
})
