# Stock management API

## Overview

Libraries used:

- typescript + es6/es7
- express.js
- winston.js for logging
- gulp as task runner
- inversify.js as dependency injector
- apidoc/tsdoc for API/code documentation
- mocha for tests

## Installation

Make sure to have node.js installed (node 8+ and npm 5+ recommended).

If unsure, use nvm:

    nvm install
    nvm use

Install missing dependencies:

    npm install


## Compile

Compile the project with:

    npm run build

or using the build task in vscode



## Start the server

### Manually

    node release/js/bin/httpApi.js

### PM2

    pm2 start ecosystem.json

### Watch task

    npm run watchApi

## Debug

You can debug manually using node-inspector or the legacy node REPL, or by using the vscode debugger.

A vscode launch.json config file is included in the repo.

## Docs

Build the API documentation with:

    npm run apidoc

The docs are compiled into docs/ folder and they can be served with

    node release/js/bin/apiDocs.js

## Tests

configure `config/test.json` (recommended) or use the `config/default.json`. Run the tests with:

    npm run test

## Config files

Deploy specific configs are stored in `config/default.json` and `config/{{env}}.json`

They are read using config.js library.

The schema and the default config can be found in `src/core/config.ts`
    
# Project Structure

## .vscode/

Configuration files for Visual Studio Code

## config/

Deploy specific config, stored in `config/default.json` and `config/{{env}}.json`.

`custom-environment-variables.json` is used to map environment variables to configuration fields.

## docs/

API documentation built using apidoc.js library and apidoc npm task

## src/api

Code for the HTTP APIs

`route.js` is the main bootstrap of the routes

## src/api/endpoints

endpoints for the API (i.e. /user, /product etc.).

Every endpoint has a controller, a route configuration and a test file.

## src/bin/

Folder for the main runnable binaries.

Every binary usually fetch the config files, instantiate the main classes using inversify.js and run the server.

## src/core

Main classes for the backend

## models/

database models (only stock in this case)

## service/

Injectable services

## utils

(Non Injectable) utility functions
