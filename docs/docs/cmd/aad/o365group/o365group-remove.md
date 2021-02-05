# aad o365group remove

Removes an Microsoft 365 Group

## Usage

```sh
m365 aad o365group remove [options]
```

## Options

`-i, --id <id>`
: The ID of the Microsoft 365 Group to remove

`--confirm`
: Don't prompt for confirming removing the group

--8<-- "docs/cmd/_global.md"

## Remarks

If the specified _id_ doesn't refer to an existing group, you will get a `Resource does not exist` error.

## Examples

Remove group with id _28beab62-7540-4db1-a23f-29a6018a3848_. Will prompt for confirmation before removing the group

```sh
m365 aad o365group remove --id 28beab62-7540-4db1-a23f-29a6018a3848
```

Remove group with id _28beab62-7540-4db1-a23f-29a6018a3848_ without prompting for confirmation

```sh
m365 aad o365group remove --id 28beab62-7540-4db1-a23f-29a6018a3848 --confirm
```