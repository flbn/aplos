# aplós

aplós is a simple static site generator built with node.js. aplós means simple in greek.

all static site generators claim to be 'small' and/or 'simple' solutions, but you end up having to bend your website's logic to the will of whatever technical decision the original creators made. in essence, that is all software. anyway, i had enough so i built my own. why study documentation for a couple of hours when you can create your own static site generator and study the documentation of the tools you're using for days [haha, totally not weeks]?

*sigh*

also, why program if you don't build your own tools? it's fun this way, you can build a tiny universe with your computer. some day i'll revisit this project and refactor it with deno and typescript. for now, node and vanilla js do the job very well.

## license

apolós is free to be utilized by individuals and organizations that are not assholes, by my discretion. for more information, check out the super legit and official [licensing](license.md) document.

## requirements
apolós is developed and built on a macOS machine, it requires:
- node.js 14

## file system
the following are an example of how the file system could work.

### pre-build 
```markdown
src/
  assets/
    image.jpg
  pages/
    blog/
      post1.md
    index.md
    blog.md
  styles/
    blog.css
    global.css
  templates/
    index.html
    blog.html
    blog-post.html
  build.js
```
### post-build 
```markdown
build/
  assets/
    image.jpg
  blog/
    post1.html
  index.html
  blog.html
  styles/
    blog.css
    global.css
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
