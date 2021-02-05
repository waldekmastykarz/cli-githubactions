# outlook report mailappusageappsusercounts

Gets the count of unique users per email app

## Usage

```sh
m365 outlook report mailappusageappsusercounts [options]
```

## Options

`-p, --period <period>`
: The length of time over which the report is aggregated. Supported values `D7,D30,D90,D180`

`-f, --outputFile [outputFile]`
: Path to the file where the report should be stored in

--8<-- "docs/cmd/_global.md"

## Examples

Gets the count of unique users per email app for the last week

```sh
m365 outlook report mailappusageappsusercounts --period D7
```

Gets the count of unique users per email app for the last week and exports the report data in the specified path in text format

```sh
m365 outlook report mailappusageappsusercounts --period D7 --output text > "mailappusageappsusercounts.txt"
```

Gets the count of unique users per email app for the last week and exports the report data in the specified path in json format

```sh
m365 outlook report mailappusageappsusercounts --period D7 --output json > "mailappusageappsusercounts.json"
```
