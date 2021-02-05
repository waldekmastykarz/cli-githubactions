import * as chalk from 'chalk';
import { Logger } from '../../../../cli';
import GlobalOptions from '../../../../GlobalOptions';
import { GraphItemsListCommand } from '../../../base/GraphItemsListCommand';
import commands from '../../commands';
import { ToDoList } from '../../ToDoList';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions { }

class TodoListListCommand extends GraphItemsListCommand<ToDoList> {
  public get name(): string {
    return `${commands.LIST_LIST}`;
  }

  public get description(): string {
    return 'Returns a list of Microsoft To Do task lists';
  }

  public defaultProperties(): string[] | undefined {
    return ['displayName', 'id'];
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: (err?: any) => void): void {
    this
      .getAllItems(`${this.resource}/beta/me/todo/lists`, logger, true)
      .then((): void => {
        logger.log(this.items);

        if (this.verbose) {
          logger.logToStderr(chalk.green('DONE'));
        }

        cb();
      }, (err: any): void => this.handleRejectedODataJsonPromise(err, logger, cb));
  }
}

module.exports = new TodoListListCommand();