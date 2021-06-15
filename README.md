# aplós

aplós is a simple static site generator built with node.js. aplós means simple in greek.

all static site generators claim to be 'small' and/or 'simple' solutions, but you end up having to bend your website's logic to the will of whatever technical decision the original creators made. in essence, that is all software. anyway, i had enough so i built my own. why study documentation for a couple of hours when you can create your own static site generator and study the documentation of the tools you're using for days [haha, totally not weeks]?

*sigh*

also, why program if you don't build your own tools? it's fun this way, you can build a tiny universe with your computer. some day i'll revisit this project and refactor it with deno and typescript. for now, node and vanilla js do the job very well.

## license

apolós is free to be utilized by individuals and organizations that are not assholes, by my discretion. for more information, check out the super legit and official [licensing](LICENSE.md) document.

## requirements
apolós is developed and built on a macOS machine, it requires:
- node.js 14

## file system
### pre-build 
```markdown
src/
  pages/
    dev/
      dev.md
    index.md
    menu.md
  assets/
    image.jpg
    image2.png
  templates/
    index.html
    menu.html
  styles/
    aqua.css
    gry.md
  templates/
    index.html
    menu.html
  index.js
```
### post-build 
```markdown
build/
  dev/
    dev.html
  index.html
  menu.html
  styles/
    aqua.css
    gry.css
```
## commands
to run developer mode:
```bash
npm run dev
```

to run the linter (eslint):
```bash
npm run lint
```

to build:
```bash
node run start
```
or 
```bash
npm start
```