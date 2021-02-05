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
  body: string;
  repliedToId?: number;
  directToUserIds?: string;
  groupId?: number;
  networkId?: number;
}

class YammerMessageAddCommand extends YammerCommand {
  public get name(): string {
    return commands.YAMMER_MESSAGE_ADD;
  }

  public get description(): string {
    return 'Posts a Yammer network message on behalf of the current user';
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps.repliedToId = args.options.repliedToId !== undefined;
    telemetryProps.directToUserIds = args.options.directToUserIds !== undefined;
    telemetryProps.groupId = args.options.groupId !== undefined;
    telemetryProps.networkId = args.options.networkId !== undefined;
    return telemetryProps;
  }

  public defaultProperties(): string[] | undefined {
    return ['id'];
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: () => void): void {
    const requestOptions: any = {
      url: `${this.resource}/v1/messages.json`,
      headers: {
        accept: 'application/json;odata.metadata=none',
        'content-type': 'application/json;odata=nometadata'
      },
      responseType: 'json',
      body: {
        body: args.options.body,
        replied_to_id: args.options.repliedToId,
        direct_to_user_ids: args.options.directToUserIds,
        group_id: args.options.groupId,
        network_id: args.options.networkId
      }
    };

    request
      .post(requestOptions)
      .then((res: any): void => {
        let result = null;
        if (res.messages && res.messages.length == 1) {
          result = res.messages[0];
        }

        logger.log(result);
        cb();
      }, (err: any): void => this.handleRejectedODataJsonPromise(err, logger, cb));
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-b, --body <body>'
      },
      {
        option: '-r, --repliedToId [repliedToId]'
      },
      {
        option: '-d, --directToUserIds [directToUserIds]'
      },
      {
        option: '--groupId [groupId]'
      },
      {
        option: '--networkId [networkId]'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(args: CommandArgs): boolean | string {
    if (args.options.groupId && typeof args.options.groupId !== 'number') {
      return `${args.options.groupId} is not a number`;
    }

    if (args.options.networkId && typeof args.options.networkId !== 'number') {
      return `${args.options.networkId} is not a number`;
    }

    if (args.options.repliedToId && typeof args.options.repliedToId !== 'number') {
      return `${args.options.repliedToId} is not a number`;
    }

    return true;
  }
}

module.exports = new YammerMessageAddCommand();
