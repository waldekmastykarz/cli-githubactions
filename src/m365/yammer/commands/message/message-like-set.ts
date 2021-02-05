import { Cli, Logger } from '../../../../cli';
import { CommandOption } from '../../../../Command';
import GlobalOptions from '../../../../GlobalOptions';
import request from '../../../../request';
import YammerCommand from '../../../base/YammerCommand';
import commands from '../../commands';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  id: number;
  enable?: string;
  confirm?: boolean;
}

class YammerMessageLikeSetCommand extends YammerCommand {
  constructor() {
    super();
  }

  public get name(): string {
    return `${commands.YAMMER_MESSAGE_LIKE_SET}`;
  }

  public get description(): string {
    return 'Likes or unlikes a Yammer message';
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps.enable = args.options.enable !== undefined;
    telemetryProps.confirm = (!(!args.options.confirm)).toString();
    return telemetryProps;
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: () => void): void {
    const executeLikeAction: () => void = (): void => {
      const endpoint = `${this.resource}/v1/messages/liked_by/current.json`;
      const requestOptions: any = {
        url: endpoint,
        headers: {
          accept: 'application/json;odata.metadata=none',
          'content-type': 'application/json;odata=nometadata'
        },
        responseType: 'json',
        data: {
          message_id: args.options.id
        }
      };

      if (args.options.enable !== 'false') {
        request
          .post(requestOptions)
          .then((res: any): void => {
            cb();
          }, (err: any): void => this.handleRejectedODataJsonPromise(err, logger, cb));
      }
      else {
        request
          .delete(requestOptions)
          .then((res: any): void => {
            cb();
          }, (err: any): void => this.handleRejectedODataJsonPromise(err, logger, cb));
      }
    };

    if (args.options.enable === 'false') {
      if (args.options.confirm) {
        executeLikeAction();
      }
      else {
        const messagePrompt = `Are you sure you want to unlike message ${args.options.id}?`;

        Cli.prompt({
          type: 'confirm',
          name: 'continue',
          default: false,
          message: messagePrompt,
        }, (result: { continue: boolean }): void => {
          if (!result.continue) {
            cb();
          }
          else {
            executeLikeAction();
          }
        });
      }
    }
    else {
      executeLikeAction();
    }
  };

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '--id <id>'
      },
      {
        option: '--enable [enable]'
      },
      {
        option: '--confirm'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(args: CommandArgs): boolean | string {
    if (args.options.id && typeof args.options.id !== 'number') {
      return `${args.options.id} is not a number`;
    }

    if (args.options.enable &&
      args.options.enable !== 'true' &&
      args.options.enable !== 'false') {
      return `${args.options.enable} is not a valid value for the enable option. Allowed values are true|false`;
    }

    return true;
  }
}

module.exports = new YammerMessageLikeSetCommand();