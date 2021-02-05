import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '../../../../cli';
import {
  CommandOption
} from '../../../../Command';
import config from '../../../../config';
import GlobalOptions from '../../../../GlobalOptions';
import request from '../../../../request';
import Utils from '../../../../Utils';
import SpoCommand from '../../../base/SpoCommand';
import commands from '../../commands';
import { ClientSvcResponse, ClientSvcResponseContents, ContextInfo } from '../../spo';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  name: string;
  filePath: string;
  isInverted: boolean;
}

class SpoThemeSetCommand extends SpoCommand {
  public get name(): string {
    return commands.THEME_SET;
  }

  public get description(): string {
    return 'Add or update a theme';
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps.inverted = (!(!args.options.isInverted)).toString();
    return telemetryProps;
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: () => void): void {
    let spoAdminUrl: string = '';

    this
      .getSpoAdminUrl(logger, this.debug)
      .then((_spoAdminUrl: string): Promise<ContextInfo> => {
        spoAdminUrl = _spoAdminUrl;
        return this.getRequestDigest(spoAdminUrl);
      })
      .then((res: ContextInfo): Promise<string> => {
        const fullPath: string = path.resolve(args.options.filePath);

        if (this.verbose) {
          logger.logToStderr(`Adding theme from ${fullPath} to tenant...`);
        }

        const palette: any = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

        if (this.debug) {
          logger.logToStderr('');
          logger.logToStderr('Palette');
          logger.logToStderr(JSON.stringify(palette));
        }

        const isInverted: boolean = args.options.isInverted ? true : false;

        const requestOptions: any = {
          url: `${spoAdminUrl}/_vti_bin/client.svc/ProcessQuery`,
          headers: {
            'X-RequestDigest': res.FormDigestValue
          },
          data: `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="${config.applicationName}" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009"><Actions><ObjectPath Id="10" ObjectPathId="9" /><Method Name="UpdateTenantTheme" Id="11" ObjectPathId="9"><Parameters><Parameter Type="String">${Utils.escapeXml(args.options.name)}</Parameter><Parameter Type="String">{"isInverted":${isInverted},"name":"${Utils.escapeXml(args.options.name)}","palette":${JSON.stringify(palette)}}</Parameter></Parameters></Method></Actions><ObjectPaths><Constructor Id="9" TypeId="{268004ae-ef6b-4e9b-8425-127220d84719}"/></ObjectPaths></Request>`
        };

        return request.post(requestOptions);
      })
      .then((res: string): Promise<void> => {
        const json: ClientSvcResponse = JSON.parse(res);
        const contents: ClientSvcResponseContents = json.find(x => { return x['ErrorInfo']; });

        if (contents && contents.ErrorInfo) {
          return Promise.reject(contents.ErrorInfo.ErrorMessage || 'ClientSvc unknown error');
        }
        return Promise.resolve();

      }).then((): void => {
        if (this.verbose) {
          logger.logToStderr(chalk.green('DONE'));
        }

        cb();
      }, (err: any): void => this.handleRejectedPromise(err, logger, cb));
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [{
      option: '-n, --name <name>'
    },
    {
      option: '-p, --filePath <filePath>'
    },
    {
      option: '--isInverted'
    }];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(args: CommandArgs): boolean | string {
    const fullPath: string = path.resolve(args.options.filePath);

    if (!fs.existsSync(fullPath)) {
      return `File '${fullPath}' not found`;
    }

    if (fs.lstatSync(fullPath).isDirectory()) {
      return `Path '${fullPath}' points to a directory`;
    }

    if (!Utils.isValidTheme(fs.readFileSync(fullPath, 'utf-8'))) {
      return 'File contents is not a valid theme';
    }

    return true;
  }
}

module.exports = new SpoThemeSetCommand();