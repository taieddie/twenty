import { Test, type TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { type Manifest } from 'twenty-shared/application';
import { type PackageJson } from 'type-fest';

import {
  ApplicationPackageFetcherService,
  type ResolvedPackage,
} from 'src/engine/core-modules/application/application-package/application-package-fetcher.service';
import { ApplicationRegistrationEntity } from 'src/engine/core-modules/application/application-registration/application-registration.entity';
import { ApplicationRegistrationSourceType } from 'src/engine/core-modules/application/application-registration/enums/application-registration-source-type.enum';
import { ApplicationEntity } from 'src/engine/core-modules/application/application.entity';
import {
  ApplicationException,
  ApplicationExceptionCode,
} from 'src/engine/core-modules/application/application.exception';
import { FileStorageService } from 'src/engine/core-modules/file-storage/services/file-storage.service';
import { FileEntity } from 'src/engine/core-modules/file/entities/file.entity';
import { SecureHttpClientService } from 'src/engine/core-modules/secure-http-client/secure-http-client.service';
import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';
import { getWorkspaceScopedRepositoryToken } from 'src/engine/twenty-orm/workspace-scoped-repository/get-workspace-scoped-repository-token.util';

const LOWERCASE_UUID = 'd1ee2c0c-a30b-4ebf-b007-377fd1d22cc3';
const UPPERCASE_UUID = 'D1EE2C0C-A30B-4EBF-B007-377FD1D22CC3';
const MIXEDCASE_UUID = 'D1ee2c0C-A30b-4Ebf-B007-377fd1d22Cc3';
const DIFFERENT_UUID = 'a1111111-2222-4333-8444-555555555555';

const buildMockResolvedPackage = (
  manifestUniversalIdentifier: string,
): ResolvedPackage => ({
  extractedDir: '/tmp/twenty-app-fetcher/extracted',
  cleanupDir: '/tmp/twenty-app-fetcher/work-dir',
  manifest: {
    application: {
      universalIdentifier: manifestUniversalIdentifier,
      displayName: 'Button Fields',
      description: 'Test Description',
      defaultRoleUniversalIdentifier: 'role-id',
    },
    objects: [],
    fields: [],
  } as unknown as Manifest,
  packageJson: {
    name: 'button-fields-app',
    version: '1.1.2',
  } as PackageJson,
});

const buildMockAppRegistration = (
  universalIdentifier: string,
): ApplicationRegistrationEntity =>
  ({
    id: 'registration-id',
    universalIdentifier,
    sourceType: ApplicationRegistrationSourceType.TARBALL,
  }) as ApplicationRegistrationEntity;

describe('ApplicationPackageFetcherService', () => {
  let service: ApplicationPackageFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationPackageFetcherService,
        {
          provide: TwentyConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: FileStorageService,
          useValue: {
            readFile: jest.fn(),
          },
        },
        {
          provide: SecureHttpClientService,
          useValue: {
            getHttpClient: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(FileEntity),
          useValue: {
            findOneOrFail: jest.fn(),
          },
        },
        {
          provide: getWorkspaceScopedRepositoryToken(ApplicationEntity),
          useValue: {
            findOneOrFail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ApplicationPackageFetcherService>(
      ApplicationPackageFetcherService,
    );
  });

  describe('resolvePackage', () => {
    it('should resolve successfully and normalize manifest universalIdentifier when manifest is uppercase and registration is lowercase', async () => {
      const mockResolvedPackage = buildMockResolvedPackage(UPPERCASE_UUID);
      const appRegistration = buildMockAppRegistration(LOWERCASE_UUID);

      jest
        .spyOn(service as any, 'resolveFromSource')
        .mockResolvedValue(mockResolvedPackage);
      const cleanupSpy = jest
        .spyOn(service, 'cleanupExtractedDir')
        .mockResolvedValue(undefined);

      const result = await service.resolvePackage(appRegistration);

      expect(result).toBeDefined();
      expect(result?.manifest.application.universalIdentifier).toBe(
        LOWERCASE_UUID,
      );
      expect(cleanupSpy).not.toHaveBeenCalled();
    });

    it('should resolve successfully and normalize manifest universalIdentifier when manifest is lowercase and registration is uppercase', async () => {
      const mockResolvedPackage = buildMockResolvedPackage(LOWERCASE_UUID);
      const appRegistration = buildMockAppRegistration(UPPERCASE_UUID);

      jest
        .spyOn(service as any, 'resolveFromSource')
        .mockResolvedValue(mockResolvedPackage);
      const cleanupSpy = jest
        .spyOn(service, 'cleanupExtractedDir')
        .mockResolvedValue(undefined);

      const result = await service.resolvePackage(appRegistration);

      expect(result).toBeDefined();
      expect(result?.manifest.application.universalIdentifier).toBe(
        LOWERCASE_UUID,
      );
      expect(cleanupSpy).not.toHaveBeenCalled();
    });

    it('should resolve successfully and normalize manifest universalIdentifier when both are mixed case', async () => {
      const mockResolvedPackage = buildMockResolvedPackage(MIXEDCASE_UUID);
      const appRegistration = buildMockAppRegistration(UPPERCASE_UUID);

      jest
        .spyOn(service as any, 'resolveFromSource')
        .mockResolvedValue(mockResolvedPackage);
      const cleanupSpy = jest
        .spyOn(service, 'cleanupExtractedDir')
        .mockResolvedValue(undefined);

      const result = await service.resolvePackage(appRegistration);

      expect(result).toBeDefined();
      expect(result?.manifest.application.universalIdentifier).toBe(
        LOWERCASE_UUID,
      );
      expect(cleanupSpy).not.toHaveBeenCalled();
    });

    it('should throw ApplicationException with PACKAGE_RESOLUTION_FAILED and clean up directory when UUIDs differ', async () => {
      const mockResolvedPackage = buildMockResolvedPackage(LOWERCASE_UUID);
      const appRegistration = buildMockAppRegistration(DIFFERENT_UUID);

      jest
        .spyOn(service as any, 'resolveFromSource')
        .mockResolvedValue(mockResolvedPackage);
      const cleanupSpy = jest
        .spyOn(service, 'cleanupExtractedDir')
        .mockResolvedValue(undefined);

      let thrownError: ApplicationException | undefined;

      try {
        await service.resolvePackage(appRegistration);
      } catch (error) {
        thrownError = error as ApplicationException;
      }

      expect(thrownError).toBeInstanceOf(ApplicationException);
      expect(thrownError?.code).toBe(
        ApplicationExceptionCode.PACKAGE_RESOLUTION_FAILED,
      );
      expect(thrownError?.message).toBe(
        `Resolved package declares application ${LOWERCASE_UUID} but registration is for ${DIFFERENT_UUID}`,
      );
      expect(cleanupSpy).toHaveBeenCalledWith(mockResolvedPackage.cleanupDir);
    });

    it('should throw ApplicationException and clean up directory when manifest universalIdentifier is missing', async () => {
      const mockResolvedPackage = buildMockResolvedPackage(
        undefined as unknown as string,
      );
      const appRegistration = buildMockAppRegistration(LOWERCASE_UUID);

      jest
        .spyOn(service as any, 'resolveFromSource')
        .mockResolvedValue(mockResolvedPackage);
      const cleanupSpy = jest
        .spyOn(service, 'cleanupExtractedDir')
        .mockResolvedValue(undefined);

      let thrownError: ApplicationException | undefined;

      try {
        await service.resolvePackage(appRegistration);
      } catch (error) {
        thrownError = error as ApplicationException;
      }

      expect(thrownError).toBeInstanceOf(ApplicationException);
      expect(thrownError?.code).toBe(
        ApplicationExceptionCode.PACKAGE_RESOLUTION_FAILED,
      );
      expect(cleanupSpy).toHaveBeenCalledWith(mockResolvedPackage.cleanupDir);
    });

    it('should return null when resolveFromSource returns null', async () => {
      const appRegistration = buildMockAppRegistration(LOWERCASE_UUID);

      jest.spyOn(service as any, 'resolveFromSource').mockResolvedValue(null);
      const cleanupSpy = jest
        .spyOn(service, 'cleanupExtractedDir')
        .mockResolvedValue(undefined);

      const result = await service.resolvePackage(appRegistration);

      expect(result).toBeNull();
      expect(cleanupSpy).not.toHaveBeenCalled();
    });
  });
});
