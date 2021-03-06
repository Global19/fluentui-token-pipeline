---
title: Using the pipeline CLI
---

🏠 [Home](./)

# Using the pipeline CLI

You can use the pipeline as a command-line tool.

## Setting up

Install [Node.js](https://nodejs.org/), and then do *one* of the following:

* Clone this repo and build it, and then run `npm link` to install the tool globally
* From *another* repo, add a dev dependency on `fluentui-token-pipeline`
	* **Important:** This package is currently not published on NPM, so this won't work yet without some `npm link` usage

Once you have the tool set up, run:

```console
transform-tokens
```

You'll get details of the arguments and their usage. Here's a full usage example:

```console
transform-tokens --in tokens.json --out build
```

That will transform the tokens in one single JSON file and output them to a subfolder named `build`.

### Using the CLI as a build step in another repo

You can use this CLI as a build step in another repo with this in your `package.json`:

```json
"devDependencies": {
	"fluentui-token-pipeline": "0.2.0"
},
"scripts": {
	"build": "transform-tokens --in tokens.json --out build"
}
```

Then, when you run `npm run build` in that repo, it would produce output into a `build` subfolder based on tokens defined in `tokens.json`.

## Security

This project generates code. The JSON files that it accepts as input are considered trustworthy, but given a malicious input, it would likely be possible to generate malicious code. Be sure to keep this in mind if you use this project with untrusted input.
