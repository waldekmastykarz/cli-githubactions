# flow list

Lists Microsoft Flows in the given environment

## Usage

```sh
m365 flow list [options]
```

## Options

`-e, --environment <environment>`
: The name of the environment for which to retrieve available Flows

`--asAdmin`
: Set, to list all Flows as admin. Otherwise will return only your own Flows

--8<-- "docs/cmd/_global.md"

## Remarks

!!! attention
    This command is based on an API that is currently in preview and is subject to change once the API reached general availability.

If the environment with the name you specified doesn't exist, you will get the `Access to the environment 'xyz' is denied.` error.

By default, the `flow list` command returns only your Flows. To list all Flows, use the `asAdmin` option.

## Examples

List all your Flows in the given environment

```sh
m365 flow list --environment Default-d87a7535-dd31-4437-bfe1-95340acd55c5
```

List all Flows in the given environment

```sh
m365 flow list --environment Default-d87a7535-dd31-4437-bfe1-95340acd55c5 --asAdmin
```