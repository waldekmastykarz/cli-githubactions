import { Logger } from "../../cli";
import Command, { CommandError } from "../../Command";

export default abstract class YammerCommand extends Command {
  protected get resource(): string {
    return 'https://www.yammer.com/api';
  }

  protected handleRejectedODataJsonPromise(response: any, logger: Logger, callback: (err?: any) => void): void {
    if (response.statusCode === 404) {
      callback(new CommandError("Not found (404)"));
    } else if (response.error && response.error.base) {
      callback(new CommandError(response.error.base));
    }
    else {
      callback(new CommandError(response));
    }
  }
}