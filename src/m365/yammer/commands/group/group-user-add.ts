import { Logger } from '../../../../cli';
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
  userId?: number;
  email?: string;
}

class YammerGroupUserAddCommand extends YammerCommand {
  public get name(): string {
    return `${commands.YAMMER_GROUP_USER_ADD}`;
  }

  public get description(): string {
    return 'Adds a user to a Yammer Group';
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps.userId = typeof args.options.userId !== 'undefined';
    telemetryProps.email = typeof args.options.email !== 'undefined';
    return telemetryProps;
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: () => void): void {
    const requestOptions: any = {
      url: `${this.resource}/v1/group_memberships.json`,
      headers: {
        accept: 'application/json;odata.metadata=none',
        'content-type': 'application/json;odata=nometadata'
      },
      responseType: 'json',
      data: {
        group_id: args.options.id,
        user_id: args.options.userId,
        email: args.options.email
      }
    };

    request
      .post(requestOptions)
      .then((res: any): void => {
        cb();
      }, (err: any): void => this.handleRejectedODataJsonPromise(err, logger, cb));
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
        option: '--email [email]'
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

module.exports = new YammerGroupUserAddCommand();