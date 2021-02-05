# teams app install

Installs an app from the catalog to a Microsoft Teams team

## Usage

```sh
m365 teams app install [options]
```

## Options

`--appId <appId>`
: The ID of the app to install

`--teamId <teamId>`
: The ID of the Microsoft Teams team to which to install the app

--8<-- "docs/cmd/_global.md"

## Remarks

The `appId` has to be the ID of the app from the Microsoft Teams App Catalog. Do not use the ID from the manifest of the zip app package. Use the [teams app list](./app-list.md) command to get this ID.

## Examples

Install an app from the catalog in a Microsoft Teams team

```sh
m365 teams app install --appId 4440558e-8c73-4597-abc7-3644a64c4bce --teamId 2609af39-7775-4f94-a3dc-0dd67657e900
```