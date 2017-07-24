# generator-xrm-webresource
|Build|NPM|Semantic-Release|
|-----|---|----------------|
|[![Build Status](https://travis-ci.org/derekfinlinson/generator-xrm-webresource.png?branch=master)](https://travis-ci.org/derekfinlinson/generator-xrm-webresource)|[![npm](https://img.shields.io/npm/v/generator-xrm-webresource.svg?style=flat-square)](https://www.npmjs.com/package/generator-xrm-webresource)|[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)|

Yeoman generator for Dynamics 365 Web Resource project using the latest JavaScript development tools

## Generators

* Project scaffolding
  * Webpack for bundling of script files
  * Deploy web resources from webpack emits using [node-webresource](https://github.com/derekfinlinson/node-webresource)
* Script Web Resources
  * TypeScript
  * Form, ribbon or web resources scripts
  * Unit test using [xrm-mock](https://github.com/camelCaseDave/xrm-mock)
* HTML Web Resources
  * Template includes ClientGlobalContext script tag

## Usage

```node
yo xrm-webresource

yo xrm-webresource:script

yo xrm-webresource:html
```
