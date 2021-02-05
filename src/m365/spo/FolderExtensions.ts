import * as url from 'url';
import { Logger } from '../../cli';
import request from '../../request';
import Utils from '../../Utils';

/**
 * Folder methods that are shared among multiple commands.
 */
export class FolderExtensions {

  public constructor(private logger: Logger, private debug: boolean) {
  }

  /**
   * Ensures the folder path exists
   * @param webFullUrl web full url e.g. https://contoso.sharepoint.com/sites/site1
   * @param folderToEnsure web relative or server relative folder path e.g. /Documents/MyFolder or /sites/site1/Documents/MyFolder
   * @param siteAccessToken a valid access token for the site specified in the webFullUrl param
   */
  public ensureFolder(webFullUrl: string, folderToEnsure: string): Promise<void> {

    const webUrl = url.parse(webFullUrl);
    if (!webUrl.protocol || !webUrl.hostname) {
      return Promise.reject('webFullUrl is not a valid URL');
    }

    if (!folderToEnsure) {
      return Promise.reject('folderToEnsure cannot be empty');
    }

    // remove last '/' of webFullUrl if exists
    const webFullUrlLastCharPos: number = webFullUrl.length - 1;

    if (webFullUrl.length > 1 &&
      webFullUrl[webFullUrlLastCharPos] === '/') {
      webFullUrl = webFullUrl.substring(0, webFullUrlLastCharPos);
    }

    folderToEnsure = Utils.getWebRelativePath(webFullUrl, folderToEnsure);

    if (this.debug) {
      this.logger.log(`folderToEnsure`);
      this.logger.log(folderToEnsure);
      this.logger.log('');
    }

    let nextFolder: string = '';
    let prevFolder: string = '';
    let folderIndex: number = 0;

    // build array of folders e.g. ["Shared%20Documents","22","54","55"]
    let folders: string[] = folderToEnsure.substring(1).split('/');

    if (this.debug) {
      this.logger.log('folders to process');
      this.logger.log(JSON.stringify(folders));
      this.logger.log('');
    }

    // recursive function
    const checkOrAddFolder = (resolve: () => void, reject: (error: any) => void): void => {
      if (folderIndex === folders.length) {
        if (this.debug) {
          this.logger.log(`All sub-folders exist`);
        }

        return resolve();
      }

      // append the next sub-folder to the folder path and check if it exists
      prevFolder = nextFolder;
      nextFolder += `/${folders[folderIndex]}`;
      const folderServerRelativeUrl = Utils.getServerRelativePath(webFullUrl, nextFolder);

      const requestOptions: any = {
        url: `${webFullUrl}/_api/web/GetFolderByServerRelativeUrl('${encodeURIComponent(folderServerRelativeUrl)}')`,
        headers: {
          'accept': 'application/json;odata=nometadata'
        }
      };

      request
        .get(requestOptions)
        .then(() => {
          folderIndex++;
          checkOrAddFolder(resolve, reject);
        })
        .catch(() => {
          const prevFolderServerRelativeUrl: string = Utils.getServerRelativePath(webFullUrl, prevFolder);
          const requestOptions: any = {
            url: `${webFullUrl}/_api/web/GetFolderByServerRelativePath(DecodedUrl=@a1)/AddSubFolderUsingPath(DecodedUrl=@a2)?@a1=%27${encodeURIComponent(prevFolderServerRelativeUrl)}%27&@a2=%27${encodeURIComponent(folders[folderIndex])}%27`,
            headers: {
              'accept': 'application/json;odata=nometadata'
            },
            responseType: 'json'
          };

          return request.post(requestOptions)
            .then(() => {
              folderIndex++;
              checkOrAddFolder(resolve, reject);
            })
            .catch((err: any) => {
              if (this.debug) {
                this.logger.log(`Could not create sub-folder ${folderServerRelativeUrl}`);
              }

              reject(err);
            });
        });
    }
    return new Promise<void>(checkOrAddFolder);
  }
}