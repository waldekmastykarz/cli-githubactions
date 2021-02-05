import { JsonFile } from ".";

export interface PackageSolutionJson extends JsonFile {
  $schema: string;
  solution?: {
    developer?: PackageSolutionJsonDeveloper;
    includeClientSideAssets?: boolean;
    isDomainIsolated?: boolean;
    skipFeatureDeployment?: boolean;
  }
}

export interface PackageSolutionJsonDeveloper {
  mpnId?: string;
  name?: string;
  privacyUrl?: string;
  termOfUseUrl?: string;
  websiteUrl?: string;
}