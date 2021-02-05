# spo report siteusagesitecounts

Gets the total number of files across all sites and the number of active files

## Usage

```sh
m365 spo report siteusagesitecounts [options]
```

## Options

`-p, --period <period>`
: The length of time over which the report is aggregated. Supported values `D7,D30,D90,D180`

`-f, --outputFile [outputFile]`
: Path to the file where the report should be stored in

--8<-- "docs/cmd/_global.md"

## Remarks

A file (user or system) is considered active if it has been saved, synced, modified, or shared within the specified time period.

## Examples

Gets the total number of files across all sites and the number of active files for the last week

```sh
m365 spo report siteusagesitecounts --period D7
```

Gets the total number of files across all sites and the number of active files for the last week and exports the report data in the specified path in text format

```sh
m365 spo report siteusagesitecounts --period D7 --output text > "siteusagesitecounts.txt"
```

Gets the total number of files across all sites and the number of active files for the last week and exports the report data in the specified path in json format

```sh
m365 spo report siteusagesitecounts --period D7 --output json > "siteusagesitecounts.json"
```
