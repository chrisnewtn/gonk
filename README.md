# gonk
Easily run your Node.js scripts from anywhere without cluttering your path.

[![Build Status](https://travis-ci.org/chrisnewtn/gonk.svg?branch=master)](https://travis-ci.org/chrisnewtn/gonk)

<img alt="A drawing of a Gonk droid by Clay Sisk http://www.siskart.com/ via Planet Pulp http://www.planet-pulp.com/" src="https://cloud.githubusercontent.com/assets/1112716/14381233/aedfdfc6-fd7c-11e5-9a9b-9f34751f2457.jpg" width="256">

## Installation
You can install Gonk using [NPM][1]

```sh
npm install -g gonk
```

[1]: https://www.npmjs.com/

## Usage
Gonk is a script runner. User scripts are kept in the `.gonk-scripts` directory in the `$HOME` directory of the logged in user. You can execute a script in that directory like so:

```sh
$ gonk print-name-of-script.js
Name of Script!
$
```
The ".js" of the script name is optional. Scripts passed without an extension are assumed to be Node.js scripts. Currently, only Node.js scripts are supported. This will soon change is adding support for more is pretty trivial.

Any arguments specified after the name of the script are passed to the script. e.g.

```sh
$ gonk print-first-argument.js first-argument
first-argument!
$
```

## Configuration
Currently, the only configurable aspect of Gonk is the scripts directory. The scripts directory is read from the `GONK_SCRIPTS_DIRECTORY` environment variable.

## Why?
All I basically wanted to get out of this is the ability to run scripts that sit in a directory from anywhere on my machine, without cluttering the PATH with all of them.

I'm also planning to perhaps add some library functions that most scripts run with Gonk would want to use. Not sure about it though, I don't want the project to turn into some generic util.* bloated nightmare function bucket.
