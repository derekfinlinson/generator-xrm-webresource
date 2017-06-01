# generator-xrm-webresource
[![Build Status](https://travis-ci.org/derekfinlinson/generator-xrm-webresource.png?branch=master)](https://travis-ci.org/derekfinlinson/generator-xrm-webresource) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Yeoman generator for Dynamics 365 Web Resource project using the latest JavaScript development tools

## Generators

* Project scaffolding
  * Webpack for bundling of script files
  * Gulp for deploying web resources using [gulp-webresource](https://github.com/davidyack/gulp-webresource)
  * Yarn for package management
* Script Web Resources
  * TypeScript
  * Form, ribbon or web resources scripts
* HTML Web Resources
  * Template includes ClientGlobalContext script tag

## Usage

```node
yo xrm-webresource

yo xrm-webresource:script

yo xrm-webresource:html
```
