# aad app add

Creates new Azure AD app registration

## Usage

```sh
m365 aad app add [options]
```

## Options

`-n, --name <name>`
: Name of the app

`--multitenant`
: Specify, to make the app available to other tenants

`-r, --redirectUris [redirectUris]`
: Comma-separated list of redirect URIs. Requires `platform` to be specified

`-p, --platform [platform]`
: Platform for which the `redirectUris` should be configured. Allowed values `spa`,`web`,`publicClient`

`--implicitFlow`
: Specify, to indicate that the authorization endpoint should return ID and access tokens

`-s, --withSecret`
: When specified, will create for the app a non-expiring secret named `Default`

`--apisDelegated [apisDelegated]`
: Comma-separated list of delegated permissions to register with the app

`--apisApplication [apisApplication]`
: Comma-separated list of application permissions to register with the app

`-u, --uri [uri]`
: Application ID URI

`--scopeName [scopeName]`
: Name of the scope to add. Requires `uri` to be specified

`--scopeConsentBy [scopeConsentBy]`
: Specifies if the scope can be consented only by admins or by admins and users. Allowed values `admins`, `adminsAndUsers`. Default `admins`

`--scopeAdminConsentDisplayName [scopeAdminConsentDisplayName]`
: Scope admin consent display name

`--scopeAdminConsentDescription [scopeAdminConsentDescription]`
: Scope admin consent description

--8<-- "docs/cmd/_global.md"

## Remarks

When specifying the value for the `uri`, you can use the `_appId_` token, to include the ID of the newly generated Azure AD app registration in the Application ID URI, eg. URI `api://caf406b91cd4.ngrok.io/_appId_` will become `api://caf406b91cd4.ngrok.io/ab3bd119-faf7-4db5-ba99-eb7e748f778a` where the last portion is the app ID of the created Azure AD app registration.

When using the `withSecret` option, this command will automatically generate a secret and set it to expire in 1 year in the future.

After creating the Azure AD app registration, this command returns the app ID and object ID of the created app registration. If you used the `withSecret` option, it will also return the generated secret.

## Examples

Create new Azure AD app registration with the specified name

```sh
m365 aad app add --name 'My AAD app'
```

Create new multitenant Azure AD app registration

```sh
m365 aad app add --name 'My AAD app' --multitenant
```

Create new Azure AD app registration for a web app with the specified redirect URIs

```sh
m365 aad app add --name 'My AAD app' --redirectUris 'https://myapp.azurewebsites.net,http://localhost:4000' --platform web
```

Create new Azure AD app registration for a desktop app

```sh
m365 aad app add --name 'My AAD app' --redirectUris 'https://login.microsoftonline.com/common/oauth2/nativeclient' --platform publicClient
```

Create new Azure AD app registration with an auto-generated secret (secret returned in the command output)

```sh
m365 aad app add --name 'My AAD app' --withSecret
```

Create new Azure AD app registration for a deamon app with specified Microsoft Graph application permissions

```sh
m365 aad app add --name 'My AAD app' --withSecret --apisApplication 'https://graph.microsoft.com/Group.ReadWrite.All,https://graph.microsoft.com/Directory.Read.All'
```

Create new Azure AD app registration for a single-page app with specified Microsoft Graph delegated permissions

```sh
m365 aad app add --name 'My AAD app' --platform spa --redirectUris 'https://myspa.azurewebsites.net,http://localhost:8080' --apisDelegated 'https://graph.microsoft.com/Calendars.Read,https://graph.microsoft.com/Directory.Read.All' --implicitFlow
```

Create new Azure AD app registration with Application ID URI set to a fixed value

```sh
m365 aad app add --name 'My AAD app' --uri https://contoso.onmicrosoft.com/myapp
```

Create new Azure AD app registration with Application ID URI set to a value that contains the ID of the app registration, designated with the `_appId_` token and a custom API scope that can be consented by both admins and users

```sh
m365 aad app add --name 'My AAD app' --uri api://caf406b91cd4.ngrok.io/_appId_ --scopeName access_as_user --scopeAdminConsentDescription 'Access as a user' --scopeAdminConsentDisplayName 'Access as a user' --scopeConsentBy adminsAndUsers
```
