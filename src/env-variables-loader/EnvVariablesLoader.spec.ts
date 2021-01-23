import 'reflect-metadata';

jest.mock('dotenv');
jest.mock('envalid');

import dotenv from 'dotenv';
import envalid from 'envalid';

(envalid.makeValidator as jest.Mock).mockReturnValue(jest.fn());

jest.mock('../utils/hasValue');

import { hasValue } from '../utils/hasValue';
import { EnvVariablesLoader } from './EnvVariablesLoader';
import { EnvVariablesFixtures } from './fixtures/EnvVariablesFixtures';

describe('EnvVariablesLoader', () => {
  let oldProcessEnv: NodeJS.ProcessEnv;
  let envVariablesLoader: EnvVariablesLoader;

  beforeAll(() => {
    oldProcessEnv = process.env;

    process.env = {
      SERVER_PORT: '3000',
    };

    (envalid.cleanEnv as jest.Mock).mockReturnValue(
      EnvVariablesFixtures.withAll,
    );

    ((hasValue as unknown) as jest.Mock).mockImplementation(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      jest.requireActual('../utils/hasValue').hasValue,
    );

    envVariablesLoader = new EnvVariablesLoader();

    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = oldProcessEnv;
  });

  describe('when instanced', () => {
    beforeAll(() => {
      new EnvVariablesLoader();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call envalid.cleanEnv()', () => {
      expect(envalid.cleanEnv).toHaveBeenCalledTimes(1);
      expect(envalid.cleanEnv).toHaveBeenCalledWith(
        process.env,
        expect.anything(),
        {
          dotEnvPath: expect.any(String) as string,
          strict: true,
        },
      );
    });

    it('should call dotenv.config()', () => {
      const expected: dotenv.DotenvConfigOptions = {
        path: expect.stringContaining('.env') as string,
      };

      expect(dotenv.config).toHaveBeenCalledTimes(1);
      expect(dotenv.config).toHaveBeenCalledWith(expected);
    });
  });

  describe('having a process.env with an ENV_NAME property', () => {
    let processEnvWithEnvNameFixtures: NodeJS.ProcessEnv;
    let oldProcessEnv: NodeJS.ProcessEnv;

    beforeAll(() => {
      oldProcessEnv = process.env;
      processEnvWithEnvNameFixtures = {
        ENV_NAME: '',
        SERVER_PORT: '3000',
      };

      process.env = processEnvWithEnvNameFixtures;
    });

    afterAll(() => {
      process.env = oldProcessEnv;
    });

    describe('when instantiated', () => {
      beforeAll(() => {
        new EnvVariablesLoader();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should load the file with the prefix matching ENV_NAME', () => {
        const expected: dotenv.DotenvConfigOptions = {
          path: expect.stringContaining(
            `/${processEnvWithEnvNameFixtures.ENV_NAME as string}.env`,
          ) as string,
        };

        expect(dotenv.config).toHaveBeenCalledTimes(1);
        expect(dotenv.config).toHaveBeenCalledWith(expected);
      });
    });
  });

  describe('.envVariables', () => {
    describe('when accessed', () => {
      let result: unknown;

      beforeAll(() => {
        result = envVariablesLoader.envVariables;
      });

      it('should return the env variables', () => {
        expect(result).toStrictEqual(EnvVariablesFixtures.withAll);
      });
    });

    describe('having an EnvVariablesLoader which could not load any variables', () => {
      beforeAll(() => {
        ((hasValue as unknown) as jest.Mock).mockReturnValueOnce(false);
      });

      describe('when accessed', () => {
        let result: unknown;

        beforeAll(() => {
          try {
            void envVariablesLoader.envVariables;
          } catch (err: unknown) {
            result = err;
          }
        });

        it('should throw an Error', () => {
          expect(result).toBeInstanceOf(Error);
        });
      });
    });
  });

  describe('.load()', () => {
    describe('when called', () => {
      beforeAll(() => {
        envVariablesLoader.load();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call envalid.cleanEnv()', () => {
        expect(envalid.cleanEnv).toHaveBeenCalledTimes(1);
        expect(envalid.cleanEnv).toHaveBeenCalledWith(
          process.env,
          expect.anything(),
          {
            dotEnvPath: expect.any(String) as string,
            strict: true,
          },
        );
      });

      it('should call dotenv.config()', () => {
        const expected: dotenv.DotenvConfigOptions = {
          path: expect.stringContaining('/.env') as string,
        };

        expect(dotenv.config).toHaveBeenCalledTimes(1);
        expect(dotenv.config).toHaveBeenCalledWith(expected);
      });
    });
  });
});
