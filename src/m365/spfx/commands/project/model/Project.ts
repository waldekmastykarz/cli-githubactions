import { ConfigJson, CopyAssetsJson, DeployAzureStorageJson, GulpfileJs, Manifest, PackageJson, PackageSolutionJson, ScssFile, ServeJson, TsConfigJson, TsFile, TsLintJson, VsCode, WriteManifestsJson, YoRcJson } from ".";

export interface Project {
  path: string;

  configJson?: ConfigJson;
  copyAssetsJson?: CopyAssetsJson;
  deployAzureStorageJson?: DeployAzureStorageJson;
  gulpfileJs?: GulpfileJs;
  manifests?: Manifest[];
  packageJson?: PackageJson;
  packageSolutionJson?: PackageSolutionJson;
  serveJson?: ServeJson;
  tsConfigJson?: TsConfigJson;
  tsFiles?: TsFile[];
  scssFiles?: ScssFile[];
  tsLintJson?: TsLintJson;
  tsLintJsonRoot?: TsLintJson;
  vsCode?: VsCode;
  writeManifestsJson?: WriteManifestsJson;
  yoRcJson?: YoRcJson;
}