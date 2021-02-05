import { Cli, Logger } from '../../../../cli';
import {
  CommandOption
} from '../../../../Command';
import GlobalOptions from '../../../../GlobalOptions';
import request from '../../../../request';
import YammerCommand from "../../../base/YammerCommand";
import commands from '../../commands';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  id: number;
  userId?: number;
  confirm?: boolean;
}

class YammerGroupUserRemoveCommand extends YammerCommand {
  public get name(): string {
    return `${commands.YAMMER_GROUP_USER_REMOVE}`;
  }

  public get description(): string {
    return 'Removes a user from a Yammer group';
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps.userId = args.options.userId !== undefined;
    telemetryProps.confirm = (!(!args.options.confirm)).toString();
    return telemetryProps;
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: () => void): void {
    const executeRemoveAction: () => void = (): void => {
      let endpoint = `${this.resource}/v1/group_memberships.json`;

      const requestOptions: any = {
        url: endpoint,
        headers: {
          accept: 'application/json;odata.metadata=none',
          'content-type': 'application/json;odata=nometadata'
        },
        responseType: 'json',
        data: {
          group_id: args.options.id,
          user_id: args.options.userId
        }
      };

      request
        .delete(requestOptions)
        .then((res: any): void => {
          cb();
        }, (err: any): void => this.handleRejectedODataJsonPromise(err, logger, cb));
    };

    if (args.options.confirm) {
      executeRemoveAction();
    }
    else {
      let messagePrompt: string = `Are you sure you want to leave group ${args.options.id}?`;
      if (args.options.userId) {
        messagePrompt = `Are you sure you want to remove the user ${args.options.userId} from the group ${args.options.id}?`;
      }

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
          executeRemoveAction();
        }
      });
    }
  };

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '--id <id>'
      },
      {
        option: '--userId [userId]'
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

    if (args.options.userId && typeof args.options.userId !== 'number') {
      return `${args.options.userId} is not a number`;
    }

    return true;
  }
}

module.exports = new YammerGroupUserRemoveCommand();