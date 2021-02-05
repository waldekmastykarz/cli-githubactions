import { Finding } from "../";
import { Project } from "../../model";
import { JsonRule } from "./JsonRule";

export abstract class ResolutionRule extends JsonRule {
  constructor(protected packageName: string, protected packageVersion: string) {
    super();
  }

  get title(): string {
    return this.packageName;
  }

  get description(): string {
    return `Add resolution for package ${this.packageName}`;
  };

  get resolution(): string {
    return `{
  "resolutions": {
    "${this.packageName}": "${this.packageVersion}"
  }
}`
  };

  get resolutionType(): string {
    return 'json';
  };

  get severity(): string {
    return 'Required';
  };

  get file(): string {
    return './package.json';
  };

  customCondition(project: Project): boolean {
    return false;
  }

  visit(project: Project, findings: Finding[]): void {
    if (!project.packageJson) {
      return;
    }

    if (this.customCondition(project) &&
      (!project.packageJson.resolutions ||
        project.packageJson.resolutions[this.packageName] !== this.packageVersion)) {
      const node = this.getAstNodeFromFile(project.packageJson, `resolutions.${this.packageName}`);
      this.addFindingWithPosition(findings, node);
    }
  }
}