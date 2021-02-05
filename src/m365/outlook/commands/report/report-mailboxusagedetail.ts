import PeriodBasedReport from '../../../base/PeriodBasedReport';
import commands from '../../commands';

class OutlookReportMailboxUsageDetailCommand extends PeriodBasedReport {
  public get name(): string {
    return commands.OUTLOOK_REPORT_MAILBOXUSAGEDETAIL;
  }

  public get usageEndpoint(): string {
    return 'getMailboxUsageDetail';
  }

  public get description(): string {
    return 'Gets details about mailbox usage';
  }
}

module.exports = new OutlookReportMailboxUsageDetailCommand();