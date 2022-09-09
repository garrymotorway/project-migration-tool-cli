# project-migration-tool-cli

## Motivation

This is CLI wrapper around the project migration tool core library to allow functionality to be accessed via the CLI rather than code.

## Pre-requisites (assuming Shortcut to JIRA migration)

* Must have a target project setup in JIRA
* Must have a board setup in JIRA (the ID in the url is the rapid view ID). In JIRA this is achieved as follows (if it doesn't exist already)
* Board (pulldown) > Create Board > Scrum > Board from an existing project > Enter a name > Create board.
* You must map statuses in Shortcut to the desired statuses in JIRA (see [project-migration-tool README](https://github.com/garrymotorway/project-migration-tool) for an example of what this should look like); the Shortcut side uses a regular expression to match, so you can use wildcards etc for fuzzy matching. Every status * from Shortcut must be mappable.

## To install

```
npm i -g promig@https://github.com/garrymotorway/project-migration-tool-cli.git
```

I had issues with this; the node_modules didn't install for the client (possibly because it's coming from GIT). You can also do this:

```
git clone https://github.com/garrymotorway/project-migration-tool-cli.git project-migration-tool-cli-tmp && npm --prefix ./project-migration-tool-cli-tmp i && npm --prefix ./project-migration-tool-cli-tmp run build && npm i -g promig@./project-migration-tool-cli-tmp
```

...but this requires a bit of manual tidy-up after to remove the tool.

## To run

```sh
promig \
    --config ./file.json \
    --source-token 123 \
    --destination-token 456 \
    --default-assignee garry@motorway.com \
    --destination-seed 100
```

* `--config` a file with your configuration (see [project-migration-tool README](https://github.com/garrymotorway/project-migration-tool) for an example of what this should look like).
* `--source-token` required to authenticate against the source system. For JIRA you need to generate an API key and base64 it, like this
    ```bash
    echo -n 'garry@motorway.co.uk:mykey' | base64
    ```
* `--destination-token` required to authenticate against the destination system (JIRA, for example, doesn't need this as we output a file to upload, so this could be made option in future).
* `--default-assignee` a default assignee for issues where users from the source system don't exist in the destination system.
* `--destination-seed` if your destination project already has issues, set this higher than the highest issue number to avoid ID clashes.
* `--sample` for testing uploads; generate a sample of issues rather than a full extract').

## Tech debt

* Bit flaky importing Git repo as module. Had to add a postinstall step in the dependency to build the Typescript. Would be better if it were deployed to NPM or a private repo and installed properly.
* No tests around this CLI tool atm.
