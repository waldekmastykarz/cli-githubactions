# todo task add

Adds a task to a Microsoft To Do list

## Usage

```sh
m365 todo task add [options]
```

## Options

`-t, --title <title>`
: The title of the task

`--listName [listName]`
: The name of the list in which to create the task. Specify either `listName` or `listId` but not both

`--listId [listId]`
: The id of the list in which to create the task. Specify either `listName` or `listId` but not both

--8<-- "docs/cmd/_global.md"

## Examples

Add a task with title _New task_ to Microsoft To Do tasks list with the name _My task list_

```sh
m365 todo task add --title "New task" --listName "My task list"
```

Add a task with title _New task_ to Microsoft To Do tasks list with the id `AQMkADlhMTRkOGEzLWQ1M2QtNGVkNS04NjdmLWU0NzJhMjZmZWNmMwAuAAADKvwNgAMNPE_zFNRJXVrU1wEAhHKQZHItDEOVCn8U3xuA2AABmQeVPwAAAA==`

```sh
m365 todo task add --title "New task" --listId "AQMkADlhMTRkOGEzLWQ1M2QtNGVkNS04NjdmLWU0NzJhMjZmZWNmMwAuAAADKvwNgAMNPE_zFNRJXVrU1wEAhHKQZHItDEOVCn8U3xuA2AABmQeVPwAAAA=="
```
