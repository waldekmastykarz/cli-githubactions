import * as assert from 'assert';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command, { CommandError } from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';
import { CanvasColumn, CanvasSection, ClientSidePage, ClientSideText } from './clientsidepages';
const command: Command = require('./page-control-list');

describe(commands.PAGE_CONTROL_LIST, () => {
  let log: string[];
  let logger: Logger;
  let loggerLogSpy: sinon.SinonSpy;
  
  before(() => {
    sinon.stub(auth, 'restoreAuth').callsFake(() => Promise.resolve());
    sinon.stub(appInsights, 'trackEvent').callsFake(() => {});
    auth.service.connected = true;
  });

  beforeEach(() => {
    log = [];
    logger = {
      log: (msg: string) => {
        log.push(msg);
      },
      logRaw: (msg: string) => {
        log.push(msg);
      },
      logToStderr: (msg: string) => {
        log.push(msg);
      }
    };
    loggerLogSpy = sinon.spy(logger, 'log');
  });

  afterEach(() => {
    Utils.restore([
      request.get,
      ClientSidePage.fromHtml
    ]);
  });

  after(() => {
    Utils.restore([
      auth.restoreAuth,
      appInsights.trackEvent
    ]);
    auth.service.connected = false;
  });

  it('has correct name', () => {
    assert.strictEqual(command.name.startsWith(commands.PAGE_CONTROL_LIST), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });

  it('defines correct properties for the default output', () => {
    assert.deepStrictEqual(command.defaultProperties(), ['id', 'type', 'title']);
  });

  it('lists controls on the modern page', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf(`/_api/web/getfilebyserverrelativeurl('/sites/team-a/SitePages/home.aspx')`) > -1) {
        return Promise.resolve({
          "ListItemAllFields": {
            "CommentsDisabled": false,
            "FileSystemObjectType": 0,
            "Id": 1,
            "ServerRedirectedEmbedUri": null,
            "ServerRedirectedEmbedUrl": "",
            "ContentTypeId": "0x0101009D1CB255DA76424F860D91F20E6C41180062FDF2882AB3F745ACB63105A3C623C9",
            "FileLeafRef": "Home.aspx",
            "ComplianceAssetId": null,
            "WikiField": null,
            "Title": "Home",
            "ClientSideApplicationId": "b6917cb1-93a0-4b97-a84d-7cf49975d4ec",
            "PageLayoutType": "Home",
            "CanvasContent1": "<div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;ede2ee65-157d-4523-b4ed-87b9b64374a6&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;1,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;0.5,&quot;sectionFactor&quot;&#58;8&#125;,&quot;webPartId&quot;&#58;&quot;34b617b3-5f5d-4682-98ed-fc6908dc0f4c&quot;,&quot;addedFromPersistedData&quot;&#58;true&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;34b617b3-5f5d-4682-98ed-fc6908dc0f4c&quot;,&quot;instanceId&quot;&#58;&quot;ede2ee65-157d-4523-b4ed-87b9b64374a6&quot;,&quot;title&quot;&#58;&quot;Minified HelloWorld&quot;,&quot;description&quot;&#58;&quot;HelloWorld description&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;description&quot;&#58;&quot;HelloWorld&quot;&#125;&#125;\"><div data-sp-componentid=\"\">34b617b3-5f5d-4682-98ed-fc6908dc0f4c</div><div data-sp-htmlproperties=\"\"></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;8c88f208-6c77-4bdb-86a0-0c47b4316588&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;1,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;8&#125;,&quot;displayMode&quot;&#58;2,&quot;addedFromPersistedData&quot;&#58;true,&quot;id&quot;&#58;&quot;3ede60d3-dc2c-438b-b5bf-cc40bb2351e5&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;8c88f208-6c77-4bdb-86a0-0c47b4316588&quot;,&quot;instanceId&quot;&#58;&quot;3ede60d3-dc2c-438b-b5bf-cc40bb2351e5&quot;,&quot;title&quot;&#58;&quot;News&quot;,&quot;description&quot;&#58;&quot;Display recent news.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&quot;title&quot;&#58;&quot;News&quot;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&quot;baseUrl&quot;&#58;&quot;https&#58;//contoso.sharepoint.com/sites/team-a&quot;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;layoutId&quot;&#58;&quot;FeaturedNews&quot;,&quot;dataProviderId&quot;&#58;&quot;viewCounts&quot;,&quot;emptyStateHelpItemsCount&quot;&#58;1,&quot;newsDataSourceProp&quot;&#58;2,&quot;newsSiteList&quot;&#58;[],&quot;webId&quot;&#58;&quot;4f118c69-66e0-497c-96ff-d7855ce0713d&quot;,&quot;siteId&quot;&#58;&quot;016bd1f4-ea50-46a4-809b-e97efb96399c&quot;&#125;&#125;\"><div data-sp-componentid=\"\">8c88f208-6c77-4bdb-86a0-0c47b4316588</div><div data-sp-htmlproperties=\"\"><div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">News</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;c70391ea-0b10-4ee9-b2b4-006d3fcad0cd&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;1,&quot;sectionIndex&quot;&#58;2,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;4&#125;,&quot;displayMode&quot;&#58;2,&quot;addedFromPersistedData&quot;&#58;true,&quot;id&quot;&#58;&quot;63da0d97-9db4-4847-a4bf-3ae019d4c6f2&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;c70391ea-0b10-4ee9-b2b4-006d3fcad0cd&quot;,&quot;instanceId&quot;&#58;&quot;63da0d97-9db4-4847-a4bf-3ae019d4c6f2&quot;,&quot;title&quot;&#58;&quot;Quick links&quot;,&quot;description&quot;&#58;&quot;Add links to important documents and pages.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&quot;title&quot;&#58;&quot;Quick links&quot;,&quot;items[0].title&quot;&#58;&quot;Learn about a team site&quot;,&quot;items[1].title&quot;&#58;&quot;Learn how to add a page&quot;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&quot;baseUrl&quot;&#58;&quot;https&#58;//contoso.sharepoint.com/sites/team-a&quot;,&quot;items[0].url&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827918&quot;,&quot;items[1].url&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827919&quot;,&quot;items[0].renderInfo.linkUrl&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827918&quot;,&quot;items[1].renderInfo.linkUrl&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827919&quot;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;items&quot;&#58;[&#123;&quot;siteId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;webId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;uniqueId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;itemType&quot;&#58;2,&quot;fileExtension&quot;&#58;&quot;com/fwlink/p/?linkid=827918&quot;,&quot;progId&quot;&#58;&quot;&quot;,&quot;flags&quot;&#58;0,&quot;hasInvalidUrl&quot;&#58;false,&quot;renderInfo&quot;&#58;&#123;&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;compactImageInfo&quot;&#58;&#123;&quot;iconName&quot;&#58;&quot;Globe&quot;,&quot;color&quot;&#58;&quot;&quot;,&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;forceIconSize&quot;&#58;true&#125;,&quot;backupImageUrl&quot;&#58;&quot;&quot;,&quot;iconUrl&quot;&#58;&quot;&quot;,&quot;accentColor&quot;&#58;&quot;&quot;,&quot;imageFit&quot;&#58;0,&quot;forceStandardImageSize&quot;&#58;false,&quot;isFetching&quot;&#58;false&#125;,&quot;id&quot;&#58;1&#125;,&#123;&quot;siteId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;webId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;uniqueId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;itemType&quot;&#58;2,&quot;fileExtension&quot;&#58;&quot;com/fwlink/p/?linkid=827919&quot;,&quot;progId&quot;&#58;&quot;&quot;,&quot;flags&quot;&#58;0,&quot;hasInvalidUrl&quot;&#58;false,&quot;renderInfo&quot;&#58;&#123;&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;compactImageInfo&quot;&#58;&#123;&quot;iconName&quot;&#58;&quot;Globe&quot;,&quot;color&quot;&#58;&quot;&quot;,&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;forceIconSize&quot;&#58;true&#125;,&quot;backupImageUrl&quot;&#58;&quot;&quot;,&quot;iconUrl&quot;&#58;&quot;&quot;,&quot;accentColor&quot;&#58;&quot;&quot;,&quot;imageFit&quot;&#58;0,&quot;forceStandardImageSize&quot;&#58;false,&quot;isFetching&quot;&#58;false&#125;,&quot;id&quot;&#58;2&#125;],&quot;isMigrated&quot;&#58;true,&quot;layoutId&quot;&#58;&quot;CompactCard&quot;,&quot;shouldShowThumbnail&quot;&#58;true,&quot;hideWebPartWhenEmpty&quot;&#58;true,&quot;dataProviderId&quot;&#58;&quot;QuickLinks&quot;,&quot;webId&quot;&#58;&quot;4f118c69-66e0-497c-96ff-d7855ce0713d&quot;,&quot;siteId&quot;&#58;&quot;016bd1f4-ea50-46a4-809b-e97efb96399c&quot;&#125;&#125;\"><div data-sp-componentid=\"\">c70391ea-0b10-4ee9-b2b4-006d3fcad0cd</div><div data-sp-htmlproperties=\"\"><div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">Quick links</div><div data-sp-prop-name=\"items[0].title\" data-sp-searchableplaintext=\"true\">Learn about a team site</div><div data-sp-prop-name=\"items[1].title\" data-sp-searchableplaintext=\"true\">Learn how to add a page</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a><a data-sp-prop-name=\"items[0].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a><a data-sp-prop-name=\"items[0].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;eb95c819-ab8f-4689-bd03-0c2d65d47b1f&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;2,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;8&#125;,&quot;displayMode&quot;&#58;2,&quot;addedFromPersistedData&quot;&#58;true,&quot;id&quot;&#58;&quot;4366ceff-b92b-4a12-905e-1dd2535f976d&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;eb95c819-ab8f-4689-bd03-0c2d65d47b1f&quot;,&quot;instanceId&quot;&#58;&quot;4366ceff-b92b-4a12-905e-1dd2535f976d&quot;,&quot;title&quot;&#58;&quot;Site activity&quot;,&quot;description&quot;&#58;&quot;Show recent activities from your site.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;maxItems&quot;&#58;9&#125;&#125;\"><div data-sp-componentid=\"\">eb95c819-ab8f-4689-bd03-0c2d65d47b1f</div><div data-sp-htmlproperties=\"\"></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;f92bf067-bc19-489e-a556-7fe95f508720&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;2,&quot;sectionIndex&quot;&#58;2,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;4&#125;,&quot;addedFromPersistedData&quot;&#58;true,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;456dfbc7-57be-4489-92ce-666224c4fcf1&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;f92bf067-bc19-489e-a556-7fe95f508720&quot;,&quot;instanceId&quot;&#58;&quot;456dfbc7-57be-4489-92ce-666224c4fcf1&quot;,&quot;title&quot;&#58;&quot;Document library&quot;,&quot;description&quot;&#58;&quot;Add a document library.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;isDocumentLibrary&quot;&#58;true,&quot;showDefaultDocumentLibrary&quot;&#58;true,&quot;webpartHeightKey&quot;&#58;4,&quot;selectedListUrl&quot;&#58;&quot;&quot;,&quot;listTitle&quot;&#58;&quot;Documents&quot;&#125;&#125;\"><div data-sp-componentid=\"\">f92bf067-bc19-489e-a556-7fe95f508720</div><div data-sp-htmlproperties=\"\"></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;4,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;d933a0dd-9536-48a6-bd85-888b85ede7d0&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;3,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1&#125;,&quot;innerHTML&quot;&#58;&quot;&lt;p&gt;Lorem ipsum&lt;/p&gt;\\n\\n&lt;p&gt;Dolor samet&lt;/p&gt;\\n&quot;,&quot;editorType&quot;&#58;&quot;CKEditor&quot;,&quot;addedFromPersistedData&quot;&#58;true&#125;\"><div data-sp-rte=\"\"><p>Lorem ipsum</p>\n\n<p>Dolor samet</p>\n</div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;4,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;135f1d1a-2eb9-4655-a913-b9f23114b01f&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;4,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1&#125;,&quot;innerHTML&quot;&#58;&quot;&lt;p&gt;Lorem ipsum&lt;/p&gt;\\n&quot;,&quot;editorType&quot;&#58;&quot;CKEditor&quot;,&quot;addedFromPersistedData&quot;&#58;true&#125;\"><div data-sp-rte=\"\"><p>Lorem ipsum</p>\n</div></div></div>",
            "BannerImageUrl": {
              "Description": "/_layouts/15/images/sitepagethumbnail.png",
              "Url": "https://contoso.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
            },
            "Description": "Lorem ipsum Dolor samet Lorem ipsum",
            "PromotedState": null,
            "FirstPublishedDate": null,
            "LayoutWebpartsContent": null,
            "AuthorsId": null,
            "AuthorsStringId": null,
            "OriginalSourceUrl": null,
            "ID": 1,
            "Created": "2018-01-20T09:54:41",
            "AuthorId": 1073741823,
            "Modified": "2018-04-12T12:42:47",
            "EditorId": 12,
            "OData__CopySource": null,
            "CheckoutUserId": null,
            "OData__UIVersionString": "7.0",
            "GUID": "edaab907-e729-48dd-9e73-26487c0cf592"
          },
          "CheckInComment": "",
          "CheckOutType": 2,
          "ContentTag": "{E82A21D1-CA2C-4854-98F2-012AC0E7FA09},25,1",
          "CustomizedPageStatus": 1,
          "ETag": "\"{E82A21D1-CA2C-4854-98F2-012AC0E7FA09},25\"",
          "Exists": true,
          "IrmEnabled": false,
          "Length": "805",
          "Level": 1,
          "LinkingUri": null,
          "LinkingUrl": "",
          "MajorVersion": 7,
          "MinorVersion": 0,
          "Name": "home.aspx",
          "ServerRelativeUrl": "/sites/team-a/SitePages/home.aspx",
          "TimeCreated": "2018-01-20T08:54:41Z",
          "TimeLastModified": "2018-04-12T10:42:46Z",
          "Title": "Home",
          "UIVersion": 3584,
          "UIVersionLabel": "7.0",
          "UniqueId": "e82a21d1-ca2c-4854-98f2-012ac0e7fa09"
        });
      }

      return Promise.reject('Invalid request');
    });

    command.action(logger, { options: { debug: false, webUrl: 'https://contoso.sharepoint.com/sites/team-a', name: 'home.aspx' } }, () => {
      try {
        assert(loggerLogSpy.calledWith([{
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 1,
          "id": "ede2ee65-157d-4523-b4ed-87b9b64374a6",
          "controlData": {
            "controlType": 3,
            "displayMode": 2,
            "id": "ede2ee65-157d-4523-b4ed-87b9b64374a6",
            "position": {
              "zoneIndex": 1,
              "sectionIndex": 1,
              "controlIndex": 0.5,
              "sectionFactor": 8
            },
            "webPartId": "34b617b3-5f5d-4682-98ed-fc6908dc0f4c",
            "addedFromPersistedData": true
          },
          "title": "Minified HelloWorld",
          "description": "HelloWorld description",
          "propertieJson": {
            "description": "HelloWorld"
          },
          "webPartId": "34b617b3-5f5d-4682-98ed-fc6908dc0f4c",
          "htmlProperties": "",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {},
            "imageSources": {},
            "links": {}
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 2,
          "id": "3ede60d3-dc2c-438b-b5bf-cc40bb2351e5",
          "controlData": {
            "controlType": 3,
            "webPartId": "8c88f208-6c77-4bdb-86a0-0c47b4316588",
            "position": {
              "zoneIndex": 1,
              "sectionIndex": 1,
              "controlIndex": 1,
              "sectionFactor": 8
            },
            "displayMode": 2,
            "addedFromPersistedData": true,
            "id": "3ede60d3-dc2c-438b-b5bf-cc40bb2351e5"
          },
          "title": "News",
          "description": "Display recent news.",
          "propertieJson": {
            "layoutId": "FeaturedNews",
            "dataProviderId": "viewCounts",
            "emptyStateHelpItemsCount": 1,
            "newsDataSourceProp": 2,
            "newsSiteList": [],
            "webId": "4f118c69-66e0-497c-96ff-d7855ce0713d",
            "siteId": "016bd1f4-ea50-46a4-809b-e97efb96399c"
          },
          "webPartId": "8c88f208-6c77-4bdb-86a0-0c47b4316588",
          "htmlProperties": "<div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">News</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a>",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {
              "title": "News"
            },
            "imageSources": {},
            "links": {
              "baseUrl": "https://contoso.sharepoint.com/sites/team-a"
            }
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 1,
          "id": "63da0d97-9db4-4847-a4bf-3ae019d4c6f2",
          "controlData": {
            "controlType": 3,
            "webPartId": "c70391ea-0b10-4ee9-b2b4-006d3fcad0cd",
            "position": {
              "zoneIndex": 1,
              "sectionIndex": 2,
              "controlIndex": 1,
              "sectionFactor": 4
            },
            "displayMode": 2,
            "addedFromPersistedData": true,
            "id": "63da0d97-9db4-4847-a4bf-3ae019d4c6f2"
          },
          "title": "Quick links",
          "description": "Add links to important documents and pages.",
          "propertieJson": {
            "items": [
              {
                "siteId": "00000000-0000-0000-0000-000000000000",
                "webId": "00000000-0000-0000-0000-000000000000",
                "uniqueId": "00000000-0000-0000-0000-000000000000",
                "itemType": 2,
                "fileExtension": "com/fwlink/p/?linkid=827918",
                "progId": "",
                "flags": 0,
                "hasInvalidUrl": false,
                "renderInfo": {
                  "imageUrl": "",
                  "compactImageInfo": {
                    "iconName": "Globe",
                    "color": "",
                    "imageUrl": "",
                    "forceIconSize": true
                  },
                  "backupImageUrl": "",
                  "iconUrl": "",
                  "accentColor": "",
                  "imageFit": 0,
                  "forceStandardImageSize": false,
                  "isFetching": false
                },
                "id": 1
              },
              {
                "siteId": "00000000-0000-0000-0000-000000000000",
                "webId": "00000000-0000-0000-0000-000000000000",
                "uniqueId": "00000000-0000-0000-0000-000000000000",
                "itemType": 2,
                "fileExtension": "com/fwlink/p/?linkid=827919",
                "progId": "",
                "flags": 0,
                "hasInvalidUrl": false,
                "renderInfo": {
                  "imageUrl": "",
                  "compactImageInfo": {
                    "iconName": "Globe",
                    "color": "",
                    "imageUrl": "",
                    "forceIconSize": true
                  },
                  "backupImageUrl": "",
                  "iconUrl": "",
                  "accentColor": "",
                  "imageFit": 0,
                  "forceStandardImageSize": false,
                  "isFetching": false
                },
                "id": 2
              }
            ],
            "isMigrated": true,
            "layoutId": "CompactCard",
            "shouldShowThumbnail": true,
            "hideWebPartWhenEmpty": true,
            "dataProviderId": "QuickLinks",
            "webId": "4f118c69-66e0-497c-96ff-d7855ce0713d",
            "siteId": "016bd1f4-ea50-46a4-809b-e97efb96399c"
          },
          "webPartId": "c70391ea-0b10-4ee9-b2b4-006d3fcad0cd",
          "htmlProperties": "<div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">Quick links</div><div data-sp-prop-name=\"items[0].title\" data-sp-searchableplaintext=\"true\">Learn about a team site</div><div data-sp-prop-name=\"items[1].title\" data-sp-searchableplaintext=\"true\">Learn how to add a page</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a><a data-sp-prop-name=\"items[0].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a><a data-sp-prop-name=\"items[0].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a>",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {
              "title": "Quick links",
              "items[0].title": "Learn about a team site",
              "items[1].title": "Learn how to add a page"
            },
            "imageSources": {},
            "links": {
              "baseUrl": "https://contoso.sharepoint.com/sites/team-a",
              "items[0].url": "https://go.microsoft.com/fwlink/p/?linkid=827918",
              "items[1].url": "https://go.microsoft.com/fwlink/p/?linkid=827919",
              "items[0].renderInfo.linkUrl": "https://go.microsoft.com/fwlink/p/?linkid=827918",
              "items[1].renderInfo.linkUrl": "https://go.microsoft.com/fwlink/p/?linkid=827919"
            }
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 1,
          "id": "4366ceff-b92b-4a12-905e-1dd2535f976d",
          "controlData": {
            "controlType": 3,
            "webPartId": "eb95c819-ab8f-4689-bd03-0c2d65d47b1f",
            "position": {
              "zoneIndex": 2,
              "sectionIndex": 1,
              "controlIndex": 1,
              "sectionFactor": 8
            },
            "displayMode": 2,
            "addedFromPersistedData": true,
            "id": "4366ceff-b92b-4a12-905e-1dd2535f976d"
          },
          "title": "Site activity",
          "description": "Show recent activities from your site.",
          "propertieJson": {
            "maxItems": 9
          },
          "webPartId": "eb95c819-ab8f-4689-bd03-0c2d65d47b1f",
          "htmlProperties": "",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {},
            "imageSources": {},
            "links": {}
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 1,
          "id": "456dfbc7-57be-4489-92ce-666224c4fcf1",
          "controlData": {
            "controlType": 3,
            "webPartId": "f92bf067-bc19-489e-a556-7fe95f508720",
            "position": {
              "zoneIndex": 2,
              "sectionIndex": 2,
              "controlIndex": 1,
              "sectionFactor": 4
            },
            "addedFromPersistedData": true,
            "displayMode": 2,
            "id": "456dfbc7-57be-4489-92ce-666224c4fcf1"
          },
          "title": "Document library",
          "description": "Add a document library.",
          "propertieJson": {
            "isDocumentLibrary": true,
            "showDefaultDocumentLibrary": true,
            "webpartHeightKey": 4,
            "selectedListUrl": "",
            "listTitle": "Documents"
          },
          "webPartId": "f92bf067-bc19-489e-a556-7fe95f508720",
          "htmlProperties": "",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {},
            "imageSources": {},
            "links": {}
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 4,
          "dataVersion": "1.0",
          "order": 1,
          "id": "d933a0dd-9536-48a6-bd85-888b85ede7d0",
          "controlData": {
            "controlType": 4,
            "displayMode": 2,
            "id": "d933a0dd-9536-48a6-bd85-888b85ede7d0",
            "position": {
              "zoneIndex": 3,
              "sectionIndex": 1,
              "controlIndex": 1
            },
            "innerHTML": "&lt;p&gt;Lorem ipsum&lt;/p&gt;\n\n&lt;p&gt;Dolor samet&lt;/p&gt;\n",
            "editorType": "CKEditor",
            "addedFromPersistedData": true
          },
          "_text": "<p>Lorem ipsum</p><p>Dolor samet</p>",
          "type": "Client-side text"
        },
        {
          "controlType": 4,
          "dataVersion": "1.0",
          "order": 1,
          "id": "135f1d1a-2eb9-4655-a913-b9f23114b01f",
          "controlData": {
            "controlType": 4,
            "displayMode": 2,
            "id": "135f1d1a-2eb9-4655-a913-b9f23114b01f",
            "position": {
              "zoneIndex": 4,
              "sectionIndex": 1,
              "controlIndex": 1
            },
            "innerHTML": "&lt;p&gt;Lorem ipsum&lt;/p&gt;\n",
            "editorType": "CKEditor",
            "addedFromPersistedData": true
          },
          "_text": "<p>Lorem ipsum</p>",
          "type": "Client-side text"
        }]));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('lists controls on the modern page (debug)', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf(`/_api/web/getfilebyserverrelativeurl('/sites/team-a/SitePages/home.aspx')`) > -1) {
        return Promise.resolve({
          "ListItemAllFields": {
            "CommentsDisabled": false,
            "FileSystemObjectType": 0,
            "Id": 1,
            "ServerRedirectedEmbedUri": null,
            "ServerRedirectedEmbedUrl": "",
            "ContentTypeId": "0x0101009D1CB255DA76424F860D91F20E6C41180062FDF2882AB3F745ACB63105A3C623C9",
            "FileLeafRef": "Home.aspx",
            "ComplianceAssetId": null,
            "WikiField": null,
            "Title": "Home",
            "ClientSideApplicationId": "b6917cb1-93a0-4b97-a84d-7cf49975d4ec",
            "PageLayoutType": "Home",
            "CanvasContent1": "<div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;ede2ee65-157d-4523-b4ed-87b9b64374a6&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;1,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;0.5,&quot;sectionFactor&quot;&#58;8&#125;,&quot;webPartId&quot;&#58;&quot;34b617b3-5f5d-4682-98ed-fc6908dc0f4c&quot;,&quot;addedFromPersistedData&quot;&#58;true&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;34b617b3-5f5d-4682-98ed-fc6908dc0f4c&quot;,&quot;instanceId&quot;&#58;&quot;ede2ee65-157d-4523-b4ed-87b9b64374a6&quot;,&quot;title&quot;&#58;&quot;Minified HelloWorld&quot;,&quot;description&quot;&#58;&quot;HelloWorld description&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;description&quot;&#58;&quot;HelloWorld&quot;&#125;&#125;\"><div data-sp-componentid=\"\">34b617b3-5f5d-4682-98ed-fc6908dc0f4c</div><div data-sp-htmlproperties=\"\"></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;8c88f208-6c77-4bdb-86a0-0c47b4316588&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;1,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;8&#125;,&quot;displayMode&quot;&#58;2,&quot;addedFromPersistedData&quot;&#58;true,&quot;id&quot;&#58;&quot;3ede60d3-dc2c-438b-b5bf-cc40bb2351e5&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;8c88f208-6c77-4bdb-86a0-0c47b4316588&quot;,&quot;instanceId&quot;&#58;&quot;3ede60d3-dc2c-438b-b5bf-cc40bb2351e5&quot;,&quot;title&quot;&#58;&quot;News&quot;,&quot;description&quot;&#58;&quot;Display recent news.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&quot;title&quot;&#58;&quot;News&quot;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&quot;baseUrl&quot;&#58;&quot;https&#58;//contoso.sharepoint.com/sites/team-a&quot;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;layoutId&quot;&#58;&quot;FeaturedNews&quot;,&quot;dataProviderId&quot;&#58;&quot;viewCounts&quot;,&quot;emptyStateHelpItemsCount&quot;&#58;1,&quot;newsDataSourceProp&quot;&#58;2,&quot;newsSiteList&quot;&#58;[],&quot;webId&quot;&#58;&quot;4f118c69-66e0-497c-96ff-d7855ce0713d&quot;,&quot;siteId&quot;&#58;&quot;016bd1f4-ea50-46a4-809b-e97efb96399c&quot;&#125;&#125;\"><div data-sp-componentid=\"\">8c88f208-6c77-4bdb-86a0-0c47b4316588</div><div data-sp-htmlproperties=\"\"><div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">News</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;c70391ea-0b10-4ee9-b2b4-006d3fcad0cd&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;1,&quot;sectionIndex&quot;&#58;2,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;4&#125;,&quot;displayMode&quot;&#58;2,&quot;addedFromPersistedData&quot;&#58;true,&quot;id&quot;&#58;&quot;63da0d97-9db4-4847-a4bf-3ae019d4c6f2&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;c70391ea-0b10-4ee9-b2b4-006d3fcad0cd&quot;,&quot;instanceId&quot;&#58;&quot;63da0d97-9db4-4847-a4bf-3ae019d4c6f2&quot;,&quot;title&quot;&#58;&quot;Quick links&quot;,&quot;description&quot;&#58;&quot;Add links to important documents and pages.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&quot;title&quot;&#58;&quot;Quick links&quot;,&quot;items[0].title&quot;&#58;&quot;Learn about a team site&quot;,&quot;items[1].title&quot;&#58;&quot;Learn how to add a page&quot;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&quot;baseUrl&quot;&#58;&quot;https&#58;//contoso.sharepoint.com/sites/team-a&quot;,&quot;items[0].url&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827918&quot;,&quot;items[1].url&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827919&quot;,&quot;items[0].renderInfo.linkUrl&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827918&quot;,&quot;items[1].renderInfo.linkUrl&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827919&quot;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;items&quot;&#58;[&#123;&quot;siteId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;webId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;uniqueId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;itemType&quot;&#58;2,&quot;fileExtension&quot;&#58;&quot;com/fwlink/p/?linkid=827918&quot;,&quot;progId&quot;&#58;&quot;&quot;,&quot;flags&quot;&#58;0,&quot;hasInvalidUrl&quot;&#58;false,&quot;renderInfo&quot;&#58;&#123;&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;compactImageInfo&quot;&#58;&#123;&quot;iconName&quot;&#58;&quot;Globe&quot;,&quot;color&quot;&#58;&quot;&quot;,&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;forceIconSize&quot;&#58;true&#125;,&quot;backupImageUrl&quot;&#58;&quot;&quot;,&quot;iconUrl&quot;&#58;&quot;&quot;,&quot;accentColor&quot;&#58;&quot;&quot;,&quot;imageFit&quot;&#58;0,&quot;forceStandardImageSize&quot;&#58;false,&quot;isFetching&quot;&#58;false&#125;,&quot;id&quot;&#58;1&#125;,&#123;&quot;siteId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;webId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;uniqueId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;itemType&quot;&#58;2,&quot;fileExtension&quot;&#58;&quot;com/fwlink/p/?linkid=827919&quot;,&quot;progId&quot;&#58;&quot;&quot;,&quot;flags&quot;&#58;0,&quot;hasInvalidUrl&quot;&#58;false,&quot;renderInfo&quot;&#58;&#123;&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;compactImageInfo&quot;&#58;&#123;&quot;iconName&quot;&#58;&quot;Globe&quot;,&quot;color&quot;&#58;&quot;&quot;,&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;forceIconSize&quot;&#58;true&#125;,&quot;backupImageUrl&quot;&#58;&quot;&quot;,&quot;iconUrl&quot;&#58;&quot;&quot;,&quot;accentColor&quot;&#58;&quot;&quot;,&quot;imageFit&quot;&#58;0,&quot;forceStandardImageSize&quot;&#58;false,&quot;isFetching&quot;&#58;false&#125;,&quot;id&quot;&#58;2&#125;],&quot;isMigrated&quot;&#58;true,&quot;layoutId&quot;&#58;&quot;CompactCard&quot;,&quot;shouldShowThumbnail&quot;&#58;true,&quot;hideWebPartWhenEmpty&quot;&#58;true,&quot;dataProviderId&quot;&#58;&quot;QuickLinks&quot;,&quot;webId&quot;&#58;&quot;4f118c69-66e0-497c-96ff-d7855ce0713d&quot;,&quot;siteId&quot;&#58;&quot;016bd1f4-ea50-46a4-809b-e97efb96399c&quot;&#125;&#125;\"><div data-sp-componentid=\"\">c70391ea-0b10-4ee9-b2b4-006d3fcad0cd</div><div data-sp-htmlproperties=\"\"><div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">Quick links</div><div data-sp-prop-name=\"items[0].title\" data-sp-searchableplaintext=\"true\">Learn about a team site</div><div data-sp-prop-name=\"items[1].title\" data-sp-searchableplaintext=\"true\">Learn how to add a page</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a><a data-sp-prop-name=\"items[0].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a><a data-sp-prop-name=\"items[0].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;eb95c819-ab8f-4689-bd03-0c2d65d47b1f&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;2,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;8&#125;,&quot;displayMode&quot;&#58;2,&quot;addedFromPersistedData&quot;&#58;true,&quot;id&quot;&#58;&quot;4366ceff-b92b-4a12-905e-1dd2535f976d&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;eb95c819-ab8f-4689-bd03-0c2d65d47b1f&quot;,&quot;instanceId&quot;&#58;&quot;4366ceff-b92b-4a12-905e-1dd2535f976d&quot;,&quot;title&quot;&#58;&quot;Site activity&quot;,&quot;description&quot;&#58;&quot;Show recent activities from your site.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;maxItems&quot;&#58;9&#125;&#125;\"><div data-sp-componentid=\"\">eb95c819-ab8f-4689-bd03-0c2d65d47b1f</div><div data-sp-htmlproperties=\"\"></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;f92bf067-bc19-489e-a556-7fe95f508720&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;2,&quot;sectionIndex&quot;&#58;2,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;4&#125;,&quot;addedFromPersistedData&quot;&#58;true,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;456dfbc7-57be-4489-92ce-666224c4fcf1&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;f92bf067-bc19-489e-a556-7fe95f508720&quot;,&quot;instanceId&quot;&#58;&quot;456dfbc7-57be-4489-92ce-666224c4fcf1&quot;,&quot;title&quot;&#58;&quot;Document library&quot;,&quot;description&quot;&#58;&quot;Add a document library.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;isDocumentLibrary&quot;&#58;true,&quot;showDefaultDocumentLibrary&quot;&#58;true,&quot;webpartHeightKey&quot;&#58;4,&quot;selectedListUrl&quot;&#58;&quot;&quot;,&quot;listTitle&quot;&#58;&quot;Documents&quot;&#125;&#125;\"><div data-sp-componentid=\"\">f92bf067-bc19-489e-a556-7fe95f508720</div><div data-sp-htmlproperties=\"\"></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;4,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;d933a0dd-9536-48a6-bd85-888b85ede7d0&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;3,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1&#125;,&quot;innerHTML&quot;&#58;&quot;&lt;p&gt;Lorem ipsum&lt;/p&gt;\\n\\n&lt;p&gt;Dolor samet&lt;/p&gt;\\n&quot;,&quot;editorType&quot;&#58;&quot;CKEditor&quot;,&quot;addedFromPersistedData&quot;&#58;true&#125;\"><div data-sp-rte=\"\"><p>Lorem ipsum</p>\n\n<p>Dolor samet</p>\n</div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;4,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;135f1d1a-2eb9-4655-a913-b9f23114b01f&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;4,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1&#125;,&quot;innerHTML&quot;&#58;&quot;&lt;p&gt;Lorem ipsum&lt;/p&gt;\\n&quot;,&quot;editorType&quot;&#58;&quot;CKEditor&quot;,&quot;addedFromPersistedData&quot;&#58;true&#125;\"><div data-sp-rte=\"\"><p>Lorem ipsum</p>\n</div></div></div>",
            "BannerImageUrl": {
              "Description": "/_layouts/15/images/sitepagethumbnail.png",
              "Url": "https://contoso.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
            },
            "Description": "Lorem ipsum Dolor samet Lorem ipsum",
            "PromotedState": null,
            "FirstPublishedDate": null,
            "LayoutWebpartsContent": null,
            "AuthorsId": null,
            "AuthorsStringId": null,
            "OriginalSourceUrl": null,
            "ID": 1,
            "Created": "2018-01-20T09:54:41",
            "AuthorId": 1073741823,
            "Modified": "2018-04-12T12:42:47",
            "EditorId": 12,
            "OData__CopySource": null,
            "CheckoutUserId": null,
            "OData__UIVersionString": "7.0",
            "GUID": "edaab907-e729-48dd-9e73-26487c0cf592"
          },
          "CheckInComment": "",
          "CheckOutType": 2,
          "ContentTag": "{E82A21D1-CA2C-4854-98F2-012AC0E7FA09},25,1",
          "CustomizedPageStatus": 1,
          "ETag": "\"{E82A21D1-CA2C-4854-98F2-012AC0E7FA09},25\"",
          "Exists": true,
          "IrmEnabled": false,
          "Length": "805",
          "Level": 1,
          "LinkingUri": null,
          "LinkingUrl": "",
          "MajorVersion": 7,
          "MinorVersion": 0,
          "Name": "home.aspx",
          "ServerRelativeUrl": "/sites/team-a/SitePages/home.aspx",
          "TimeCreated": "2018-01-20T08:54:41Z",
          "TimeLastModified": "2018-04-12T10:42:46Z",
          "Title": "Home",
          "UIVersion": 3584,
          "UIVersionLabel": "7.0",
          "UniqueId": "e82a21d1-ca2c-4854-98f2-012ac0e7fa09"
        });
      }

      return Promise.reject('Invalid request');
    });

    command.action(logger, { options: { debug: true, webUrl: 'https://contoso.sharepoint.com/sites/team-a', name: 'home.aspx' } }, () => {
      try {
        assert(loggerLogSpy.calledWith([{
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 1,
          "id": "ede2ee65-157d-4523-b4ed-87b9b64374a6",
          "controlData": {
            "controlType": 3,
            "displayMode": 2,
            "id": "ede2ee65-157d-4523-b4ed-87b9b64374a6",
            "position": {
              "zoneIndex": 1,
              "sectionIndex": 1,
              "controlIndex": 0.5,
              "sectionFactor": 8
            },
            "webPartId": "34b617b3-5f5d-4682-98ed-fc6908dc0f4c",
            "addedFromPersistedData": true
          },
          "title": "Minified HelloWorld",
          "description": "HelloWorld description",
          "propertieJson": {
            "description": "HelloWorld"
          },
          "webPartId": "34b617b3-5f5d-4682-98ed-fc6908dc0f4c",
          "htmlProperties": "",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {},
            "imageSources": {},
            "links": {}
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 2,
          "id": "3ede60d3-dc2c-438b-b5bf-cc40bb2351e5",
          "controlData": {
            "controlType": 3,
            "webPartId": "8c88f208-6c77-4bdb-86a0-0c47b4316588",
            "position": {
              "zoneIndex": 1,
              "sectionIndex": 1,
              "controlIndex": 1,
              "sectionFactor": 8
            },
            "displayMode": 2,
            "addedFromPersistedData": true,
            "id": "3ede60d3-dc2c-438b-b5bf-cc40bb2351e5"
          },
          "title": "News",
          "description": "Display recent news.",
          "propertieJson": {
            "layoutId": "FeaturedNews",
            "dataProviderId": "viewCounts",
            "emptyStateHelpItemsCount": 1,
            "newsDataSourceProp": 2,
            "newsSiteList": [],
            "webId": "4f118c69-66e0-497c-96ff-d7855ce0713d",
            "siteId": "016bd1f4-ea50-46a4-809b-e97efb96399c"
          },
          "webPartId": "8c88f208-6c77-4bdb-86a0-0c47b4316588",
          "htmlProperties": "<div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">News</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a>",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {
              "title": "News"
            },
            "imageSources": {},
            "links": {
              "baseUrl": "https://contoso.sharepoint.com/sites/team-a"
            }
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 1,
          "id": "63da0d97-9db4-4847-a4bf-3ae019d4c6f2",
          "controlData": {
            "controlType": 3,
            "webPartId": "c70391ea-0b10-4ee9-b2b4-006d3fcad0cd",
            "position": {
              "zoneIndex": 1,
              "sectionIndex": 2,
              "controlIndex": 1,
              "sectionFactor": 4
            },
            "displayMode": 2,
            "addedFromPersistedData": true,
            "id": "63da0d97-9db4-4847-a4bf-3ae019d4c6f2"
          },
          "title": "Quick links",
          "description": "Add links to important documents and pages.",
          "propertieJson": {
            "items": [
              {
                "siteId": "00000000-0000-0000-0000-000000000000",
                "webId": "00000000-0000-0000-0000-000000000000",
                "uniqueId": "00000000-0000-0000-0000-000000000000",
                "itemType": 2,
                "fileExtension": "com/fwlink/p/?linkid=827918",
                "progId": "",
                "flags": 0,
                "hasInvalidUrl": false,
                "renderInfo": {
                  "imageUrl": "",
                  "compactImageInfo": {
                    "iconName": "Globe",
                    "color": "",
                    "imageUrl": "",
                    "forceIconSize": true
                  },
                  "backupImageUrl": "",
                  "iconUrl": "",
                  "accentColor": "",
                  "imageFit": 0,
                  "forceStandardImageSize": false,
                  "isFetching": false
                },
                "id": 1
              },
              {
                "siteId": "00000000-0000-0000-0000-000000000000",
                "webId": "00000000-0000-0000-0000-000000000000",
                "uniqueId": "00000000-0000-0000-0000-000000000000",
                "itemType": 2,
                "fileExtension": "com/fwlink/p/?linkid=827919",
                "progId": "",
                "flags": 0,
                "hasInvalidUrl": false,
                "renderInfo": {
                  "imageUrl": "",
                  "compactImageInfo": {
                    "iconName": "Globe",
                    "color": "",
                    "imageUrl": "",
                    "forceIconSize": true
                  },
                  "backupImageUrl": "",
                  "iconUrl": "",
                  "accentColor": "",
                  "imageFit": 0,
                  "forceStandardImageSize": false,
                  "isFetching": false
                },
                "id": 2
              }
            ],
            "isMigrated": true,
            "layoutId": "CompactCard",
            "shouldShowThumbnail": true,
            "hideWebPartWhenEmpty": true,
            "dataProviderId": "QuickLinks",
            "webId": "4f118c69-66e0-497c-96ff-d7855ce0713d",
            "siteId": "016bd1f4-ea50-46a4-809b-e97efb96399c"
          },
          "webPartId": "c70391ea-0b10-4ee9-b2b4-006d3fcad0cd",
          "htmlProperties": "<div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">Quick links</div><div data-sp-prop-name=\"items[0].title\" data-sp-searchableplaintext=\"true\">Learn about a team site</div><div data-sp-prop-name=\"items[1].title\" data-sp-searchableplaintext=\"true\">Learn how to add a page</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a><a data-sp-prop-name=\"items[0].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a><a data-sp-prop-name=\"items[0].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a>",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {
              "title": "Quick links",
              "items[0].title": "Learn about a team site",
              "items[1].title": "Learn how to add a page"
            },
            "imageSources": {},
            "links": {
              "baseUrl": "https://contoso.sharepoint.com/sites/team-a",
              "items[0].url": "https://go.microsoft.com/fwlink/p/?linkid=827918",
              "items[1].url": "https://go.microsoft.com/fwlink/p/?linkid=827919",
              "items[0].renderInfo.linkUrl": "https://go.microsoft.com/fwlink/p/?linkid=827918",
              "items[1].renderInfo.linkUrl": "https://go.microsoft.com/fwlink/p/?linkid=827919"
            }
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 1,
          "id": "4366ceff-b92b-4a12-905e-1dd2535f976d",
          "controlData": {
            "controlType": 3,
            "webPartId": "eb95c819-ab8f-4689-bd03-0c2d65d47b1f",
            "position": {
              "zoneIndex": 2,
              "sectionIndex": 1,
              "controlIndex": 1,
              "sectionFactor": 8
            },
            "displayMode": 2,
            "addedFromPersistedData": true,
            "id": "4366ceff-b92b-4a12-905e-1dd2535f976d"
          },
          "title": "Site activity",
          "description": "Show recent activities from your site.",
          "propertieJson": {
            "maxItems": 9
          },
          "webPartId": "eb95c819-ab8f-4689-bd03-0c2d65d47b1f",
          "htmlProperties": "",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {},
            "imageSources": {},
            "links": {}
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 1,
          "id": "456dfbc7-57be-4489-92ce-666224c4fcf1",
          "controlData": {
            "controlType": 3,
            "webPartId": "f92bf067-bc19-489e-a556-7fe95f508720",
            "position": {
              "zoneIndex": 2,
              "sectionIndex": 2,
              "controlIndex": 1,
              "sectionFactor": 4
            },
            "addedFromPersistedData": true,
            "displayMode": 2,
            "id": "456dfbc7-57be-4489-92ce-666224c4fcf1"
          },
          "title": "Document library",
          "description": "Add a document library.",
          "propertieJson": {
            "isDocumentLibrary": true,
            "showDefaultDocumentLibrary": true,
            "webpartHeightKey": 4,
            "selectedListUrl": "",
            "listTitle": "Documents"
          },
          "webPartId": "f92bf067-bc19-489e-a556-7fe95f508720",
          "htmlProperties": "",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {},
            "imageSources": {},
            "links": {}
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 4,
          "dataVersion": "1.0",
          "order": 1,
          "id": "d933a0dd-9536-48a6-bd85-888b85ede7d0",
          "controlData": {
            "controlType": 4,
            "displayMode": 2,
            "id": "d933a0dd-9536-48a6-bd85-888b85ede7d0",
            "position": {
              "zoneIndex": 3,
              "sectionIndex": 1,
              "controlIndex": 1
            },
            "innerHTML": "&lt;p&gt;Lorem ipsum&lt;/p&gt;\n\n&lt;p&gt;Dolor samet&lt;/p&gt;\n",
            "editorType": "CKEditor",
            "addedFromPersistedData": true
          },
          "_text": "<p>Lorem ipsum</p><p>Dolor samet</p>",
          "type": "Client-side text"
        },
        {
          "controlType": 4,
          "dataVersion": "1.0",
          "order": 1,
          "id": "135f1d1a-2eb9-4655-a913-b9f23114b01f",
          "controlData": {
            "controlType": 4,
            "displayMode": 2,
            "id": "135f1d1a-2eb9-4655-a913-b9f23114b01f",
            "position": {
              "zoneIndex": 4,
              "sectionIndex": 1,
              "controlIndex": 1
            },
            "innerHTML": "&lt;p&gt;Lorem ipsum&lt;/p&gt;\n",
            "editorType": "CKEditor",
            "addedFromPersistedData": true
          },
          "_text": "<p>Lorem ipsum</p>",
          "type": "Client-side text"
        }]));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('lists controls on the modern page when the specified page name doesn\'t contain extension', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf(`/_api/web/getfilebyserverrelativeurl('/sites/team-a/SitePages/home.aspx')`) > -1) {
        return Promise.resolve({
          "ListItemAllFields": {
            "CommentsDisabled": false,
            "FileSystemObjectType": 0,
            "Id": 1,
            "ServerRedirectedEmbedUri": null,
            "ServerRedirectedEmbedUrl": "",
            "ContentTypeId": "0x0101009D1CB255DA76424F860D91F20E6C41180062FDF2882AB3F745ACB63105A3C623C9",
            "FileLeafRef": "Home.aspx",
            "ComplianceAssetId": null,
            "WikiField": null,
            "Title": "Home",
            "ClientSideApplicationId": "b6917cb1-93a0-4b97-a84d-7cf49975d4ec",
            "PageLayoutType": "Home",
            "CanvasContent1": "<div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;ede2ee65-157d-4523-b4ed-87b9b64374a6&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;1,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;0.5,&quot;sectionFactor&quot;&#58;8&#125;,&quot;webPartId&quot;&#58;&quot;34b617b3-5f5d-4682-98ed-fc6908dc0f4c&quot;,&quot;addedFromPersistedData&quot;&#58;true&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;34b617b3-5f5d-4682-98ed-fc6908dc0f4c&quot;,&quot;instanceId&quot;&#58;&quot;ede2ee65-157d-4523-b4ed-87b9b64374a6&quot;,&quot;title&quot;&#58;&quot;Minified HelloWorld&quot;,&quot;description&quot;&#58;&quot;HelloWorld description&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;description&quot;&#58;&quot;HelloWorld&quot;&#125;&#125;\"><div data-sp-componentid=\"\">34b617b3-5f5d-4682-98ed-fc6908dc0f4c</div><div data-sp-htmlproperties=\"\"></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;8c88f208-6c77-4bdb-86a0-0c47b4316588&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;1,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;8&#125;,&quot;displayMode&quot;&#58;2,&quot;addedFromPersistedData&quot;&#58;true,&quot;id&quot;&#58;&quot;3ede60d3-dc2c-438b-b5bf-cc40bb2351e5&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;8c88f208-6c77-4bdb-86a0-0c47b4316588&quot;,&quot;instanceId&quot;&#58;&quot;3ede60d3-dc2c-438b-b5bf-cc40bb2351e5&quot;,&quot;title&quot;&#58;&quot;News&quot;,&quot;description&quot;&#58;&quot;Display recent news.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&quot;title&quot;&#58;&quot;News&quot;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&quot;baseUrl&quot;&#58;&quot;https&#58;//contoso.sharepoint.com/sites/team-a&quot;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;layoutId&quot;&#58;&quot;FeaturedNews&quot;,&quot;dataProviderId&quot;&#58;&quot;viewCounts&quot;,&quot;emptyStateHelpItemsCount&quot;&#58;1,&quot;newsDataSourceProp&quot;&#58;2,&quot;newsSiteList&quot;&#58;[],&quot;webId&quot;&#58;&quot;4f118c69-66e0-497c-96ff-d7855ce0713d&quot;,&quot;siteId&quot;&#58;&quot;016bd1f4-ea50-46a4-809b-e97efb96399c&quot;&#125;&#125;\"><div data-sp-componentid=\"\">8c88f208-6c77-4bdb-86a0-0c47b4316588</div><div data-sp-htmlproperties=\"\"><div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">News</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;c70391ea-0b10-4ee9-b2b4-006d3fcad0cd&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;1,&quot;sectionIndex&quot;&#58;2,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;4&#125;,&quot;displayMode&quot;&#58;2,&quot;addedFromPersistedData&quot;&#58;true,&quot;id&quot;&#58;&quot;63da0d97-9db4-4847-a4bf-3ae019d4c6f2&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;c70391ea-0b10-4ee9-b2b4-006d3fcad0cd&quot;,&quot;instanceId&quot;&#58;&quot;63da0d97-9db4-4847-a4bf-3ae019d4c6f2&quot;,&quot;title&quot;&#58;&quot;Quick links&quot;,&quot;description&quot;&#58;&quot;Add links to important documents and pages.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&quot;title&quot;&#58;&quot;Quick links&quot;,&quot;items[0].title&quot;&#58;&quot;Learn about a team site&quot;,&quot;items[1].title&quot;&#58;&quot;Learn how to add a page&quot;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&quot;baseUrl&quot;&#58;&quot;https&#58;//contoso.sharepoint.com/sites/team-a&quot;,&quot;items[0].url&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827918&quot;,&quot;items[1].url&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827919&quot;,&quot;items[0].renderInfo.linkUrl&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827918&quot;,&quot;items[1].renderInfo.linkUrl&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827919&quot;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;items&quot;&#58;[&#123;&quot;siteId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;webId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;uniqueId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;itemType&quot;&#58;2,&quot;fileExtension&quot;&#58;&quot;com/fwlink/p/?linkid=827918&quot;,&quot;progId&quot;&#58;&quot;&quot;,&quot;flags&quot;&#58;0,&quot;hasInvalidUrl&quot;&#58;false,&quot;renderInfo&quot;&#58;&#123;&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;compactImageInfo&quot;&#58;&#123;&quot;iconName&quot;&#58;&quot;Globe&quot;,&quot;color&quot;&#58;&quot;&quot;,&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;forceIconSize&quot;&#58;true&#125;,&quot;backupImageUrl&quot;&#58;&quot;&quot;,&quot;iconUrl&quot;&#58;&quot;&quot;,&quot;accentColor&quot;&#58;&quot;&quot;,&quot;imageFit&quot;&#58;0,&quot;forceStandardImageSize&quot;&#58;false,&quot;isFetching&quot;&#58;false&#125;,&quot;id&quot;&#58;1&#125;,&#123;&quot;siteId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;webId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;uniqueId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;itemType&quot;&#58;2,&quot;fileExtension&quot;&#58;&quot;com/fwlink/p/?linkid=827919&quot;,&quot;progId&quot;&#58;&quot;&quot;,&quot;flags&quot;&#58;0,&quot;hasInvalidUrl&quot;&#58;false,&quot;renderInfo&quot;&#58;&#123;&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;compactImageInfo&quot;&#58;&#123;&quot;iconName&quot;&#58;&quot;Globe&quot;,&quot;color&quot;&#58;&quot;&quot;,&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;forceIconSize&quot;&#58;true&#125;,&quot;backupImageUrl&quot;&#58;&quot;&quot;,&quot;iconUrl&quot;&#58;&quot;&quot;,&quot;accentColor&quot;&#58;&quot;&quot;,&quot;imageFit&quot;&#58;0,&quot;forceStandardImageSize&quot;&#58;false,&quot;isFetching&quot;&#58;false&#125;,&quot;id&quot;&#58;2&#125;],&quot;isMigrated&quot;&#58;true,&quot;layoutId&quot;&#58;&quot;CompactCard&quot;,&quot;shouldShowThumbnail&quot;&#58;true,&quot;hideWebPartWhenEmpty&quot;&#58;true,&quot;dataProviderId&quot;&#58;&quot;QuickLinks&quot;,&quot;webId&quot;&#58;&quot;4f118c69-66e0-497c-96ff-d7855ce0713d&quot;,&quot;siteId&quot;&#58;&quot;016bd1f4-ea50-46a4-809b-e97efb96399c&quot;&#125;&#125;\"><div data-sp-componentid=\"\">c70391ea-0b10-4ee9-b2b4-006d3fcad0cd</div><div data-sp-htmlproperties=\"\"><div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">Quick links</div><div data-sp-prop-name=\"items[0].title\" data-sp-searchableplaintext=\"true\">Learn about a team site</div><div data-sp-prop-name=\"items[1].title\" data-sp-searchableplaintext=\"true\">Learn how to add a page</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a><a data-sp-prop-name=\"items[0].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a><a data-sp-prop-name=\"items[0].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;eb95c819-ab8f-4689-bd03-0c2d65d47b1f&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;2,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;8&#125;,&quot;displayMode&quot;&#58;2,&quot;addedFromPersistedData&quot;&#58;true,&quot;id&quot;&#58;&quot;4366ceff-b92b-4a12-905e-1dd2535f976d&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;eb95c819-ab8f-4689-bd03-0c2d65d47b1f&quot;,&quot;instanceId&quot;&#58;&quot;4366ceff-b92b-4a12-905e-1dd2535f976d&quot;,&quot;title&quot;&#58;&quot;Site activity&quot;,&quot;description&quot;&#58;&quot;Show recent activities from your site.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;maxItems&quot;&#58;9&#125;&#125;\"><div data-sp-componentid=\"\">eb95c819-ab8f-4689-bd03-0c2d65d47b1f</div><div data-sp-htmlproperties=\"\"></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;f92bf067-bc19-489e-a556-7fe95f508720&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;2,&quot;sectionIndex&quot;&#58;2,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;4&#125;,&quot;addedFromPersistedData&quot;&#58;true,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;456dfbc7-57be-4489-92ce-666224c4fcf1&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;f92bf067-bc19-489e-a556-7fe95f508720&quot;,&quot;instanceId&quot;&#58;&quot;456dfbc7-57be-4489-92ce-666224c4fcf1&quot;,&quot;title&quot;&#58;&quot;Document library&quot;,&quot;description&quot;&#58;&quot;Add a document library.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;isDocumentLibrary&quot;&#58;true,&quot;showDefaultDocumentLibrary&quot;&#58;true,&quot;webpartHeightKey&quot;&#58;4,&quot;selectedListUrl&quot;&#58;&quot;&quot;,&quot;listTitle&quot;&#58;&quot;Documents&quot;&#125;&#125;\"><div data-sp-componentid=\"\">f92bf067-bc19-489e-a556-7fe95f508720</div><div data-sp-htmlproperties=\"\"></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;4,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;d933a0dd-9536-48a6-bd85-888b85ede7d0&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;3,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1&#125;,&quot;innerHTML&quot;&#58;&quot;&lt;p&gt;Lorem ipsum&lt;/p&gt;\\n\\n&lt;p&gt;Dolor samet&lt;/p&gt;\\n&quot;,&quot;editorType&quot;&#58;&quot;CKEditor&quot;,&quot;addedFromPersistedData&quot;&#58;true&#125;\"><div data-sp-rte=\"\"><p>Lorem ipsum</p>\n\n<p>Dolor samet</p>\n</div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;4,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;135f1d1a-2eb9-4655-a913-b9f23114b01f&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;4,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1&#125;,&quot;innerHTML&quot;&#58;&quot;&lt;p&gt;Lorem ipsum&lt;/p&gt;\\n&quot;,&quot;editorType&quot;&#58;&quot;CKEditor&quot;,&quot;addedFromPersistedData&quot;&#58;true&#125;\"><div data-sp-rte=\"\"><p>Lorem ipsum</p>\n</div></div></div>",
            "BannerImageUrl": {
              "Description": "/_layouts/15/images/sitepagethumbnail.png",
              "Url": "https://contoso.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
            },
            "Description": "Lorem ipsum Dolor samet Lorem ipsum",
            "PromotedState": null,
            "FirstPublishedDate": null,
            "LayoutWebpartsContent": null,
            "AuthorsId": null,
            "AuthorsStringId": null,
            "OriginalSourceUrl": null,
            "ID": 1,
            "Created": "2018-01-20T09:54:41",
            "AuthorId": 1073741823,
            "Modified": "2018-04-12T12:42:47",
            "EditorId": 12,
            "OData__CopySource": null,
            "CheckoutUserId": null,
            "OData__UIVersionString": "7.0",
            "GUID": "edaab907-e729-48dd-9e73-26487c0cf592"
          },
          "CheckInComment": "",
          "CheckOutType": 2,
          "ContentTag": "{E82A21D1-CA2C-4854-98F2-012AC0E7FA09},25,1",
          "CustomizedPageStatus": 1,
          "ETag": "\"{E82A21D1-CA2C-4854-98F2-012AC0E7FA09},25\"",
          "Exists": true,
          "IrmEnabled": false,
          "Length": "805",
          "Level": 1,
          "LinkingUri": null,
          "LinkingUrl": "",
          "MajorVersion": 7,
          "MinorVersion": 0,
          "Name": "home.aspx",
          "ServerRelativeUrl": "/sites/team-a/SitePages/home.aspx",
          "TimeCreated": "2018-01-20T08:54:41Z",
          "TimeLastModified": "2018-04-12T10:42:46Z",
          "Title": "Home",
          "UIVersion": 3584,
          "UIVersionLabel": "7.0",
          "UniqueId": "e82a21d1-ca2c-4854-98f2-012ac0e7fa09"
        });
      }

      return Promise.reject('Invalid request');
    });

    command.action(logger, { options: { debug: false, webUrl: 'https://contoso.sharepoint.com/sites/team-a', name: 'home' } }, () => {
      try {
        assert(loggerLogSpy.calledWith([{
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 1,
          "id": "ede2ee65-157d-4523-b4ed-87b9b64374a6",
          "controlData": {
            "controlType": 3,
            "displayMode": 2,
            "id": "ede2ee65-157d-4523-b4ed-87b9b64374a6",
            "position": {
              "zoneIndex": 1,
              "sectionIndex": 1,
              "controlIndex": 0.5,
              "sectionFactor": 8
            },
            "webPartId": "34b617b3-5f5d-4682-98ed-fc6908dc0f4c",
            "addedFromPersistedData": true
          },
          "title": "Minified HelloWorld",
          "description": "HelloWorld description",
          "propertieJson": {
            "description": "HelloWorld"
          },
          "webPartId": "34b617b3-5f5d-4682-98ed-fc6908dc0f4c",
          "htmlProperties": "",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {},
            "imageSources": {},
            "links": {}
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 2,
          "id": "3ede60d3-dc2c-438b-b5bf-cc40bb2351e5",
          "controlData": {
            "controlType": 3,
            "webPartId": "8c88f208-6c77-4bdb-86a0-0c47b4316588",
            "position": {
              "zoneIndex": 1,
              "sectionIndex": 1,
              "controlIndex": 1,
              "sectionFactor": 8
            },
            "displayMode": 2,
            "addedFromPersistedData": true,
            "id": "3ede60d3-dc2c-438b-b5bf-cc40bb2351e5"
          },
          "title": "News",
          "description": "Display recent news.",
          "propertieJson": {
            "layoutId": "FeaturedNews",
            "dataProviderId": "viewCounts",
            "emptyStateHelpItemsCount": 1,
            "newsDataSourceProp": 2,
            "newsSiteList": [],
            "webId": "4f118c69-66e0-497c-96ff-d7855ce0713d",
            "siteId": "016bd1f4-ea50-46a4-809b-e97efb96399c"
          },
          "webPartId": "8c88f208-6c77-4bdb-86a0-0c47b4316588",
          "htmlProperties": "<div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">News</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a>",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {
              "title": "News"
            },
            "imageSources": {},
            "links": {
              "baseUrl": "https://contoso.sharepoint.com/sites/team-a"
            }
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 1,
          "id": "63da0d97-9db4-4847-a4bf-3ae019d4c6f2",
          "controlData": {
            "controlType": 3,
            "webPartId": "c70391ea-0b10-4ee9-b2b4-006d3fcad0cd",
            "position": {
              "zoneIndex": 1,
              "sectionIndex": 2,
              "controlIndex": 1,
              "sectionFactor": 4
            },
            "displayMode": 2,
            "addedFromPersistedData": true,
            "id": "63da0d97-9db4-4847-a4bf-3ae019d4c6f2"
          },
          "title": "Quick links",
          "description": "Add links to important documents and pages.",
          "propertieJson": {
            "items": [
              {
                "siteId": "00000000-0000-0000-0000-000000000000",
                "webId": "00000000-0000-0000-0000-000000000000",
                "uniqueId": "00000000-0000-0000-0000-000000000000",
                "itemType": 2,
                "fileExtension": "com/fwlink/p/?linkid=827918",
                "progId": "",
                "flags": 0,
                "hasInvalidUrl": false,
                "renderInfo": {
                  "imageUrl": "",
                  "compactImageInfo": {
                    "iconName": "Globe",
                    "color": "",
                    "imageUrl": "",
                    "forceIconSize": true
                  },
                  "backupImageUrl": "",
                  "iconUrl": "",
                  "accentColor": "",
                  "imageFit": 0,
                  "forceStandardImageSize": false,
                  "isFetching": false
                },
                "id": 1
              },
              {
                "siteId": "00000000-0000-0000-0000-000000000000",
                "webId": "00000000-0000-0000-0000-000000000000",
                "uniqueId": "00000000-0000-0000-0000-000000000000",
                "itemType": 2,
                "fileExtension": "com/fwlink/p/?linkid=827919",
                "progId": "",
                "flags": 0,
                "hasInvalidUrl": false,
                "renderInfo": {
                  "imageUrl": "",
                  "compactImageInfo": {
                    "iconName": "Globe",
                    "color": "",
                    "imageUrl": "",
                    "forceIconSize": true
                  },
                  "backupImageUrl": "",
                  "iconUrl": "",
                  "accentColor": "",
                  "imageFit": 0,
                  "forceStandardImageSize": false,
                  "isFetching": false
                },
                "id": 2
              }
            ],
            "isMigrated": true,
            "layoutId": "CompactCard",
            "shouldShowThumbnail": true,
            "hideWebPartWhenEmpty": true,
            "dataProviderId": "QuickLinks",
            "webId": "4f118c69-66e0-497c-96ff-d7855ce0713d",
            "siteId": "016bd1f4-ea50-46a4-809b-e97efb96399c"
          },
          "webPartId": "c70391ea-0b10-4ee9-b2b4-006d3fcad0cd",
          "htmlProperties": "<div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">Quick links</div><div data-sp-prop-name=\"items[0].title\" data-sp-searchableplaintext=\"true\">Learn about a team site</div><div data-sp-prop-name=\"items[1].title\" data-sp-searchableplaintext=\"true\">Learn how to add a page</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a><a data-sp-prop-name=\"items[0].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a><a data-sp-prop-name=\"items[0].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a>",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {
              "title": "Quick links",
              "items[0].title": "Learn about a team site",
              "items[1].title": "Learn how to add a page"
            },
            "imageSources": {},
            "links": {
              "baseUrl": "https://contoso.sharepoint.com/sites/team-a",
              "items[0].url": "https://go.microsoft.com/fwlink/p/?linkid=827918",
              "items[1].url": "https://go.microsoft.com/fwlink/p/?linkid=827919",
              "items[0].renderInfo.linkUrl": "https://go.microsoft.com/fwlink/p/?linkid=827918",
              "items[1].renderInfo.linkUrl": "https://go.microsoft.com/fwlink/p/?linkid=827919"
            }
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 1,
          "id": "4366ceff-b92b-4a12-905e-1dd2535f976d",
          "controlData": {
            "controlType": 3,
            "webPartId": "eb95c819-ab8f-4689-bd03-0c2d65d47b1f",
            "position": {
              "zoneIndex": 2,
              "sectionIndex": 1,
              "controlIndex": 1,
              "sectionFactor": 8
            },
            "displayMode": 2,
            "addedFromPersistedData": true,
            "id": "4366ceff-b92b-4a12-905e-1dd2535f976d"
          },
          "title": "Site activity",
          "description": "Show recent activities from your site.",
          "propertieJson": {
            "maxItems": 9
          },
          "webPartId": "eb95c819-ab8f-4689-bd03-0c2d65d47b1f",
          "htmlProperties": "",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {},
            "imageSources": {},
            "links": {}
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 3,
          "dataVersion": "1.0",
          "order": 1,
          "id": "456dfbc7-57be-4489-92ce-666224c4fcf1",
          "controlData": {
            "controlType": 3,
            "webPartId": "f92bf067-bc19-489e-a556-7fe95f508720",
            "position": {
              "zoneIndex": 2,
              "sectionIndex": 2,
              "controlIndex": 1,
              "sectionFactor": 4
            },
            "addedFromPersistedData": true,
            "displayMode": 2,
            "id": "456dfbc7-57be-4489-92ce-666224c4fcf1"
          },
          "title": "Document library",
          "description": "Add a document library.",
          "propertieJson": {
            "isDocumentLibrary": true,
            "showDefaultDocumentLibrary": true,
            "webpartHeightKey": 4,
            "selectedListUrl": "",
            "listTitle": "Documents"
          },
          "webPartId": "f92bf067-bc19-489e-a556-7fe95f508720",
          "htmlProperties": "",
          "serverProcessedContent": {
            "htmlStrings": {},
            "searchablePlainTexts": {},
            "imageSources": {},
            "links": {}
          },
          "canvasDataVersion": "1.0",
          "type": "Client-side web part"
        },
        {
          "controlType": 4,
          "dataVersion": "1.0",
          "order": 1,
          "id": "d933a0dd-9536-48a6-bd85-888b85ede7d0",
          "controlData": {
            "controlType": 4,
            "displayMode": 2,
            "id": "d933a0dd-9536-48a6-bd85-888b85ede7d0",
            "position": {
              "zoneIndex": 3,
              "sectionIndex": 1,
              "controlIndex": 1
            },
            "innerHTML": "&lt;p&gt;Lorem ipsum&lt;/p&gt;\n\n&lt;p&gt;Dolor samet&lt;/p&gt;\n",
            "editorType": "CKEditor",
            "addedFromPersistedData": true
          },
          "_text": "<p>Lorem ipsum</p><p>Dolor samet</p>",
          "type": "Client-side text"
        },
        {
          "controlType": 4,
          "dataVersion": "1.0",
          "order": 1,
          "id": "135f1d1a-2eb9-4655-a913-b9f23114b01f",
          "controlData": {
            "controlType": 4,
            "displayMode": 2,
            "id": "135f1d1a-2eb9-4655-a913-b9f23114b01f",
            "position": {
              "zoneIndex": 4,
              "sectionIndex": 1,
              "controlIndex": 1
            },
            "innerHTML": "&lt;p&gt;Lorem ipsum&lt;/p&gt;\n",
            "editorType": "CKEditor",
            "addedFromPersistedData": true
          },
          "_text": "<p>Lorem ipsum</p>",
          "type": "Client-side text"
        }]));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('handles empty columns and unknown control types', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf(`/_api/web/getfilebyserverrelativeurl('/sites/team-a/SitePages/home.aspx')`) > -1) {
        return Promise.resolve({
          "ListItemAllFields": {
            "CommentsDisabled": false,
            "FileSystemObjectType": 0,
            "Id": 1,
            "ServerRedirectedEmbedUri": null,
            "ServerRedirectedEmbedUrl": "",
            "ContentTypeId": "0x0101009D1CB255DA76424F860D91F20E6C41180062FDF2882AB3F745ACB63105A3C623C9",
            "FileLeafRef": "Home.aspx",
            "ComplianceAssetId": null,
            "WikiField": null,
            "Title": "Home",
            "ClientSideApplicationId": "b6917cb1-93a0-4b97-a84d-7cf49975d4ec",
            "PageLayoutType": "Home",
            "CanvasContent1": "<div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;ede2ee65-157d-4523-b4ed-87b9b64374a6&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;1,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;0.5,&quot;sectionFactor&quot;&#58;8&#125;,&quot;webPartId&quot;&#58;&quot;34b617b3-5f5d-4682-98ed-fc6908dc0f4c&quot;,&quot;addedFromPersistedData&quot;&#58;true&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;34b617b3-5f5d-4682-98ed-fc6908dc0f4c&quot;,&quot;instanceId&quot;&#58;&quot;ede2ee65-157d-4523-b4ed-87b9b64374a6&quot;,&quot;title&quot;&#58;&quot;Minified HelloWorld&quot;,&quot;description&quot;&#58;&quot;HelloWorld description&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;description&quot;&#58;&quot;HelloWorld&quot;&#125;&#125;\"><div data-sp-componentid=\"\">34b617b3-5f5d-4682-98ed-fc6908dc0f4c</div><div data-sp-htmlproperties=\"\"></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;8c88f208-6c77-4bdb-86a0-0c47b4316588&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;1,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;8&#125;,&quot;displayMode&quot;&#58;2,&quot;addedFromPersistedData&quot;&#58;true,&quot;id&quot;&#58;&quot;3ede60d3-dc2c-438b-b5bf-cc40bb2351e5&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;8c88f208-6c77-4bdb-86a0-0c47b4316588&quot;,&quot;instanceId&quot;&#58;&quot;3ede60d3-dc2c-438b-b5bf-cc40bb2351e5&quot;,&quot;title&quot;&#58;&quot;News&quot;,&quot;description&quot;&#58;&quot;Display recent news.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&quot;title&quot;&#58;&quot;News&quot;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&quot;baseUrl&quot;&#58;&quot;https&#58;//contoso.sharepoint.com/sites/team-a&quot;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;layoutId&quot;&#58;&quot;FeaturedNews&quot;,&quot;dataProviderId&quot;&#58;&quot;viewCounts&quot;,&quot;emptyStateHelpItemsCount&quot;&#58;1,&quot;newsDataSourceProp&quot;&#58;2,&quot;newsSiteList&quot;&#58;[],&quot;webId&quot;&#58;&quot;4f118c69-66e0-497c-96ff-d7855ce0713d&quot;,&quot;siteId&quot;&#58;&quot;016bd1f4-ea50-46a4-809b-e97efb96399c&quot;&#125;&#125;\"><div data-sp-componentid=\"\">8c88f208-6c77-4bdb-86a0-0c47b4316588</div><div data-sp-htmlproperties=\"\"><div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">News</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;c70391ea-0b10-4ee9-b2b4-006d3fcad0cd&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;1,&quot;sectionIndex&quot;&#58;2,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;4&#125;,&quot;displayMode&quot;&#58;2,&quot;addedFromPersistedData&quot;&#58;true,&quot;id&quot;&#58;&quot;63da0d97-9db4-4847-a4bf-3ae019d4c6f2&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;c70391ea-0b10-4ee9-b2b4-006d3fcad0cd&quot;,&quot;instanceId&quot;&#58;&quot;63da0d97-9db4-4847-a4bf-3ae019d4c6f2&quot;,&quot;title&quot;&#58;&quot;Quick links&quot;,&quot;description&quot;&#58;&quot;Add links to important documents and pages.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&quot;title&quot;&#58;&quot;Quick links&quot;,&quot;items[0].title&quot;&#58;&quot;Learn about a team site&quot;,&quot;items[1].title&quot;&#58;&quot;Learn how to add a page&quot;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&quot;baseUrl&quot;&#58;&quot;https&#58;//contoso.sharepoint.com/sites/team-a&quot;,&quot;items[0].url&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827918&quot;,&quot;items[1].url&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827919&quot;,&quot;items[0].renderInfo.linkUrl&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827918&quot;,&quot;items[1].renderInfo.linkUrl&quot;&#58;&quot;https&#58;//go.microsoft.com/fwlink/p/?linkid=827919&quot;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;items&quot;&#58;[&#123;&quot;siteId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;webId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;uniqueId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;itemType&quot;&#58;2,&quot;fileExtension&quot;&#58;&quot;com/fwlink/p/?linkid=827918&quot;,&quot;progId&quot;&#58;&quot;&quot;,&quot;flags&quot;&#58;0,&quot;hasInvalidUrl&quot;&#58;false,&quot;renderInfo&quot;&#58;&#123;&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;compactImageInfo&quot;&#58;&#123;&quot;iconName&quot;&#58;&quot;Globe&quot;,&quot;color&quot;&#58;&quot;&quot;,&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;forceIconSize&quot;&#58;true&#125;,&quot;backupImageUrl&quot;&#58;&quot;&quot;,&quot;iconUrl&quot;&#58;&quot;&quot;,&quot;accentColor&quot;&#58;&quot;&quot;,&quot;imageFit&quot;&#58;0,&quot;forceStandardImageSize&quot;&#58;false,&quot;isFetching&quot;&#58;false&#125;,&quot;id&quot;&#58;1&#125;,&#123;&quot;siteId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;webId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;uniqueId&quot;&#58;&quot;00000000-0000-0000-0000-000000000000&quot;,&quot;itemType&quot;&#58;2,&quot;fileExtension&quot;&#58;&quot;com/fwlink/p/?linkid=827919&quot;,&quot;progId&quot;&#58;&quot;&quot;,&quot;flags&quot;&#58;0,&quot;hasInvalidUrl&quot;&#58;false,&quot;renderInfo&quot;&#58;&#123;&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;compactImageInfo&quot;&#58;&#123;&quot;iconName&quot;&#58;&quot;Globe&quot;,&quot;color&quot;&#58;&quot;&quot;,&quot;imageUrl&quot;&#58;&quot;&quot;,&quot;forceIconSize&quot;&#58;true&#125;,&quot;backupImageUrl&quot;&#58;&quot;&quot;,&quot;iconUrl&quot;&#58;&quot;&quot;,&quot;accentColor&quot;&#58;&quot;&quot;,&quot;imageFit&quot;&#58;0,&quot;forceStandardImageSize&quot;&#58;false,&quot;isFetching&quot;&#58;false&#125;,&quot;id&quot;&#58;2&#125;],&quot;isMigrated&quot;&#58;true,&quot;layoutId&quot;&#58;&quot;CompactCard&quot;,&quot;shouldShowThumbnail&quot;&#58;true,&quot;hideWebPartWhenEmpty&quot;&#58;true,&quot;dataProviderId&quot;&#58;&quot;QuickLinks&quot;,&quot;webId&quot;&#58;&quot;4f118c69-66e0-497c-96ff-d7855ce0713d&quot;,&quot;siteId&quot;&#58;&quot;016bd1f4-ea50-46a4-809b-e97efb96399c&quot;&#125;&#125;\"><div data-sp-componentid=\"\">c70391ea-0b10-4ee9-b2b4-006d3fcad0cd</div><div data-sp-htmlproperties=\"\"><div data-sp-prop-name=\"title\" data-sp-searchableplaintext=\"true\">Quick links</div><div data-sp-prop-name=\"items[0].title\" data-sp-searchableplaintext=\"true\">Learn about a team site</div><div data-sp-prop-name=\"items[1].title\" data-sp-searchableplaintext=\"true\">Learn how to add a page</div><a data-sp-prop-name=\"baseUrl\" href=\"/sites/team-a\"></a><a data-sp-prop-name=\"items[0].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].url\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a><a data-sp-prop-name=\"items[0].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827918\"></a><a data-sp-prop-name=\"items[1].renderInfo.linkUrl\" href=\"https&#58;//go.microsoft.com/fwlink/p/?linkid=827919\"></a></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;eb95c819-ab8f-4689-bd03-0c2d65d47b1f&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;2,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;8&#125;,&quot;displayMode&quot;&#58;2,&quot;addedFromPersistedData&quot;&#58;true,&quot;id&quot;&#58;&quot;4366ceff-b92b-4a12-905e-1dd2535f976d&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;eb95c819-ab8f-4689-bd03-0c2d65d47b1f&quot;,&quot;instanceId&quot;&#58;&quot;4366ceff-b92b-4a12-905e-1dd2535f976d&quot;,&quot;title&quot;&#58;&quot;Site activity&quot;,&quot;description&quot;&#58;&quot;Show recent activities from your site.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;maxItems&quot;&#58;9&#125;&#125;\"><div data-sp-componentid=\"\">eb95c819-ab8f-4689-bd03-0c2d65d47b1f</div><div data-sp-htmlproperties=\"\"></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;3,&quot;webPartId&quot;&#58;&quot;f92bf067-bc19-489e-a556-7fe95f508720&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;2,&quot;sectionIndex&quot;&#58;2,&quot;controlIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;4&#125;,&quot;addedFromPersistedData&quot;&#58;true,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;456dfbc7-57be-4489-92ce-666224c4fcf1&quot;&#125;\"><div data-sp-webpart=\"\" data-sp-webpartdataversion=\"1.0\" data-sp-webpartdata=\"&#123;&quot;id&quot;&#58;&quot;f92bf067-bc19-489e-a556-7fe95f508720&quot;,&quot;instanceId&quot;&#58;&quot;456dfbc7-57be-4489-92ce-666224c4fcf1&quot;,&quot;title&quot;&#58;&quot;Document library&quot;,&quot;description&quot;&#58;&quot;Add a document library.&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.0&quot;,&quot;properties&quot;&#58;&#123;&quot;isDocumentLibrary&quot;&#58;true,&quot;showDefaultDocumentLibrary&quot;&#58;true,&quot;webpartHeightKey&quot;&#58;4,&quot;selectedListUrl&quot;&#58;&quot;&quot;,&quot;listTitle&quot;&#58;&quot;Documents&quot;&#125;&#125;\"><div data-sp-componentid=\"\">f92bf067-bc19-489e-a556-7fe95f508720</div><div data-sp-htmlproperties=\"\"></div></div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;4,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;d933a0dd-9536-48a6-bd85-888b85ede7d0&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;3,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1&#125;,&quot;innerHTML&quot;&#58;&quot;&lt;p&gt;Lorem ipsum&lt;/p&gt;\\n\\n&lt;p&gt;Dolor samet&lt;/p&gt;\\n&quot;,&quot;editorType&quot;&#58;&quot;CKEditor&quot;,&quot;addedFromPersistedData&quot;&#58;true&#125;\"><div data-sp-rte=\"\"><p>Lorem ipsum</p>\n\n<p>Dolor samet</p>\n</div></div><div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"1.0\" data-sp-controldata=\"&#123;&quot;controlType&quot;&#58;4,&quot;displayMode&quot;&#58;2,&quot;id&quot;&#58;&quot;135f1d1a-2eb9-4655-a913-b9f23114b01f&quot;,&quot;position&quot;&#58;&#123;&quot;zoneIndex&quot;&#58;4,&quot;sectionIndex&quot;&#58;1,&quot;controlIndex&quot;&#58;1&#125;,&quot;innerHTML&quot;&#58;&quot;&lt;p&gt;Lorem ipsum&lt;/p&gt;\\n&quot;,&quot;editorType&quot;&#58;&quot;CKEditor&quot;,&quot;addedFromPersistedData&quot;&#58;true&#125;\"><div data-sp-rte=\"\"><p>Lorem ipsum</p>\n</div></div></div>",
            "BannerImageUrl": {
              "Description": "/_layouts/15/images/sitepagethumbnail.png",
              "Url": "https://contoso.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
            },
            "Description": "Lorem ipsum Dolor samet Lorem ipsum",
            "PromotedState": null,
            "FirstPublishedDate": null,
            "LayoutWebpartsContent": null,
            "AuthorsId": null,
            "AuthorsStringId": null,
            "OriginalSourceUrl": null,
            "ID": 1,
            "Created": "2018-01-20T09:54:41",
            "AuthorId": 1073741823,
            "Modified": "2018-04-12T12:42:47",
            "EditorId": 12,
            "OData__CopySource": null,
            "CheckoutUserId": null,
            "OData__UIVersionString": "7.0",
            "GUID": "edaab907-e729-48dd-9e73-26487c0cf592"
          },
          "CheckInComment": "",
          "CheckOutType": 2,
          "ContentTag": "{E82A21D1-CA2C-4854-98F2-012AC0E7FA09},25,1",
          "CustomizedPageStatus": 1,
          "ETag": "\"{E82A21D1-CA2C-4854-98F2-012AC0E7FA09},25\"",
          "Exists": true,
          "IrmEnabled": false,
          "Length": "805",
          "Level": 1,
          "LinkingUri": null,
          "LinkingUrl": "",
          "MajorVersion": 7,
          "MinorVersion": 0,
          "Name": "home.aspx",
          "ServerRelativeUrl": "/sites/team-a/SitePages/home.aspx",
          "TimeCreated": "2018-01-20T08:54:41Z",
          "TimeLastModified": "2018-04-12T10:42:46Z",
          "Title": "Home",
          "UIVersion": 3584,
          "UIVersionLabel": "7.0",
          "UniqueId": "e82a21d1-ca2c-4854-98f2-012ac0e7fa09"
        });
      }

      return Promise.reject('Invalid request');
    });
    const page = new ClientSidePage();
    const section = new CanvasSection(page, 1);
    const column = new CanvasColumn(section, 1);
    const emptyColumn = new ClientSideText();
    emptyColumn.id = '88f7b5b2-83a8-45d1-bc61-c11425f233e3';
    (emptyColumn as any).controlType = 0;
    const unknown = new ClientSideText();
    unknown.id = 'ca1948b2-21c7-4f5d-949e-6ec237ea5585';
    (unknown as any).controlType = 5;
    column.controls.push(emptyColumn, unknown);
    section.columns.push(column);
    page.sections.push(section);
    sinon.stub(ClientSidePage, 'fromHtml').callsFake(() => page);

    command.action(logger, { options: { debug: false, webUrl: 'https://contoso.sharepoint.com/sites/team-a', name: 'home.aspx' } }, () => {
      try {
        assert(loggerLogSpy.calledWith([{
          "controlType": 0,
          "dataVersion": "1.0",
          "order": 1,
          "id": "88f7b5b2-83a8-45d1-bc61-c11425f233e3",
          "controlData": null,
          "_text": "<p></p>",
          "type": "Empty column"
        },
        {
          "controlType": 5,
          "dataVersion": "1.0",
          "order": 1,
          "id": "ca1948b2-21c7-4f5d-949e-6ec237ea5585",
          "controlData": null,
          "_text": "<p></p>",
          "type": "5"
        }]));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('shows error when the specified page is a classic page', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf(`/_api/web/getfilebyserverrelativeurl('/sites/team-a/SitePages/home.aspx')`) > -1) {
        return Promise.resolve({
          "ListItemAllFields": {
            "CommentsDisabled": false,
            "FileSystemObjectType": 0,
            "Id": 1,
            "ServerRedirectedEmbedUri": null,
            "ServerRedirectedEmbedUrl": "",
            "ContentTypeId": "0x0101080088E2A2ED69D0324A8981DD7FAC103494",
            "FileLeafRef": "Home.aspx",
            "ComplianceAssetId": null,
            "WikiField": "<div class=\"ExternalClass1188FC9011E046D4BED9C05BAD4DA96E\">\r\n            <table id=\"layoutsTable\" style=\"width&#58;100%;\">\r\n                <tbody>\r\n                    <tr style=\"vertical-align&#58;top;\">\r\n            <td colspan=\"2\"><div class=\"ms-rte-layoutszone-outer\" style=\"width&#58;100%;\"><div class=\"ms-rte-layoutszone-inner\" style=\"word-wrap&#58;break-word;margin&#58;0px;border&#58;0px;\"><div class=\"ms-rtestate-read ms-rte-wpbox\"><div class=\"ms-rtestate-read f01b62ca-c190-410c-aef9-2499ab79436e\" id=\"div_f01b62ca-c190-410c-aef9-2499ab79436e\"></div>\n  <div class=\"ms-rtestate-read\" id=\"vid_f01b62ca-c190-410c-aef9-2499ab79436e\" style=\"display&#58;none;\"></div>\n</div>\n</div></div></td>\r\n                    </tr>\r\n                    <tr style=\"vertical-align&#58;top;\">\r\n            <td style=\"width&#58;49.95%;\"><div class=\"ms-rte-layoutszone-outer\" style=\"width&#58;100%;\"><div class=\"ms-rte-layoutszone-inner\" style=\"word-wrap&#58;break-word;margin&#58;0px;border&#58;0px;\"><div class=\"ms-rtestate-read ms-rte-wpbox\"><div class=\"ms-rtestate-read 837b046b-6a02-4770-9a25-3292d955e903\" id=\"div_837b046b-6a02-4770-9a25-3292d955e903\"></div>\n  <div class=\"ms-rtestate-read\" id=\"vid_837b046b-6a02-4770-9a25-3292d955e903\" style=\"display&#58;none;\"></div>\n</div>\n</div></div></td>\r\n            <td class=\"ms-wiki-columnSpacing\" style=\"width&#58;49.95%;\"><div class=\"ms-rte-layoutszone-outer\" style=\"width&#58;100%;\"><div class=\"ms-rte-layoutszone-inner\" style=\"word-wrap&#58;break-word;margin&#58;0px;border&#58;0px;\"><div class=\"ms-rtestate-read ms-rte-wpbox\"><div class=\"ms-rtestate-read f36dd97b-6f2b-437b-a169-26a97962074d\" id=\"div_f36dd97b-6f2b-437b-a169-26a97962074d\"></div>\n  <div class=\"ms-rtestate-read\" id=\"vid_f36dd97b-6f2b-437b-a169-26a97962074d\" style=\"display&#58;none;\"></div>\n</div>\n</div></div></td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n            <span id=\"layoutsData\" style=\"display&#58;none;\">true,false,2</span></div>",
            "Title": null,
            "ClientSideApplicationId": null,
            "PageLayoutType": null,
            "CanvasContent1": null,
            "BannerImageUrl": null,
            "Description": null,
            "PromotedState": null,
            "FirstPublishedDate": null,
            "LayoutWebpartsContent": null,
            "AuthorsId": null,
            "AuthorsStringId": null,
            "OriginalSourceUrl": null,
            "ID": 1,
            "Created": "2018-03-19T17:52:56",
            "AuthorId": 1073741823,
            "Modified": "2018-03-24T07:14:28",
            "EditorId": 1073741823,
            "OData__CopySource": null,
            "CheckoutUserId": null,
            "OData__UIVersionString": "1.0",
            "GUID": "19ac5510-bba6-427b-9c1b-a3329a3b0cad"
          },
          "CheckInComment": "",
          "CheckOutType": 2,
          "ContentTag": "{8F33F78C-9F39-48E2-B99D-01C2937A56BB},4,1",
          "CustomizedPageStatus": 1,
          "ETag": "\"{8F33F78C-9F39-48E2-B99D-01C2937A56BB},4\"",
          "Exists": true,
          "IrmEnabled": false,
          "Length": "3356",
          "Level": 1,
          "LinkingUri": null,
          "LinkingUrl": "",
          "MajorVersion": 1,
          "MinorVersion": 0,
          "Name": "home.aspx",
          "ServerRelativeUrl": "/sites/team-a/SitePages/home.aspx",
          "TimeCreated": "2018-03-20T00:52:56Z",
          "TimeLastModified": "2018-03-24T14:14:28Z",
          "Title": null,
          "UIVersion": 512,
          "UIVersionLabel": "1.0",
          "UniqueId": "8f33f78c-9f39-48e2-b99d-01c2937a56bb"
        });
      }

      return Promise.reject('Invalid request');
    });

    command.action(logger, { options: { debug: false, webUrl: 'https://contoso.sharepoint.com/sites/team-a', name: 'home.aspx' } } as any, (err?: any) => {
      try {
        assert.strictEqual(JSON.stringify(err), JSON.stringify(new CommandError('Page home.aspx is not a modern page.')));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('correctly handles page not found', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      return Promise.reject({ error: {
        "odata.error": {
          "code": "-2130575338, Microsoft.SharePoint.SPException",
          "message": {
            "lang": "en-US",
            "value": "The file /sites/team-a/SitePages/home1.aspx does not exist."
          }
        }
      } });
    });

    command.action(logger, { options: { debug: false, webUrl: 'https://contoso.sharepoint.com/sites/team-a', name: 'home.aspx' } } as any, (err?: any) => {
      try {
        assert.strictEqual(JSON.stringify(err), JSON.stringify(new CommandError('The file /sites/team-a/SitePages/home1.aspx does not exist.')));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('correctly handles OData error when retrieving pages', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      return Promise.reject({ error: { 'odata.error': { message: { value: 'An error has occurred' } } } });
    });

    command.action(logger, { options: { debug: false, webUrl: 'https://contoso.sharepoint.com/sites/team-a', name: 'home.aspx' } } as any, (err?: any) => {
      try {
        assert.strictEqual(JSON.stringify(err), JSON.stringify(new CommandError('An error has occurred')));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('supports debug mode', () => {
    const options = command.options();
    let containsOption = false;
    options.forEach(o => {
      if (o.option === '--debug') {
        containsOption = true;
      }
    });
    assert(containsOption);
  });

  it('fails validation if the webUrl option is not a valid SharePoint site URL', () => {
    const actual = command.validate({ options: { webUrl: 'foo', name: 'home.aspx' } });
    assert.notStrictEqual(actual, true);
  });

  it('passes validation when the webUrl is a valid SharePoint URL and name is specified', () => {
    const actual = command.validate({ options: { webUrl: 'https://contoso.sharepoint.com', name: 'home.aspx' } });
    assert.strictEqual(actual, true);
  });
});