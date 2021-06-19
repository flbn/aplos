# aplós

aplós is a simple static site generator built with deno and typescript. aplós means simple in greek.

all static site generators claim to be 'small' and/or 'simple' solutions, but you end up having to bend your website's logic to the will of whatever technical decision the original creators made. this one's no different. in essence, that is all software. why study documentation for a couple of hours when you can create your own static site generator and study the documentation of the tools you're using for days [haha, totally not weeks]?

_sigh_

also, why program if you don't build your own tools? it's fun this way, you can build a tiny universe with your computer. ~~some day i'll revisit this project and refactor it with deno and typescript. for now, node and vanilla js do the job very well.~~

## license

apolós is free to be utilized by individuals and organizations that are not assholes, by my discretion. for more information, check out the super legit and official [licensing](license.md) document.

## requirements

apolós is developed and built on a macOS machine, it requires:

- deno
- typescript

## file system

```
build/
```
```
src/
  assets/
  pages/
  templates/
```
```
build.ts
```

      build: static build files
      src: contents of the website
      src/assets: CSS, images, other static stuff
      src/pages: markdown files to be rendered into HTML (directory structure will be replicated in the final build)
      src/templates: HTML structure for pages (pre-injection)
      build.ts: script for generating build

## commands

to build:

```bash
deno run --allow-read --allow-write --unstable build.ts
```

to run the linter (deno_lint):

```bash
deno lint
```
