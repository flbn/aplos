import * as dejs from 'https://deno.land/x/dejs@0.9.3/mod.ts';
import * as path from "https://deno.land/std@0.99.0/path/mod.ts";
import { emptyDirSync, copy, expandGlobSync  } from "https://deno.land/std@0.99.0/fs/mod.ts";
import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";

const decoder = new TextDecoder("utf-8");
const srcPath = './src'
const outPath = './build';

// clear destination folder
emptyDirSync(outPath);

// copy assets folder
copy(`${srcPath}/assets`, `${outPath}/assets`);

// read pages
Deno.chdir(`./${srcPath}/pages`);
const files = expandGlobSync('**\/*.{md,ejs,html}');

for (const file of files) {
  // create new build path
  const filePath = path.relative( "./", file.path);
  const buildPath = path.join('../../',outPath, path.dirname(filePath));

  // create new build directory
  Deno.mkdirSync(buildPath, { recursive: true });

  // read page file
  const data = decoder.decode(Deno.readFileSync(`${filePath}`));

  // render page
  const pageData = Marked.parse(data);
  const templateConfig = Object.assign({}, {
    page: pageData.meta
  });
  
  let pageContent;

  // generate page content according to file type
  switch (path.extname(filePath)) {
    case '.md':
      pageContent = pageData.content;
      break;
    case '.ts':
      pageContent = dejs.render((pageData.content), {
        filename: `${srcPath}/pages/${path.parse(filePath).name}`
      });
      break;
    default:
      pageContent = pageData.content;
  }

  // render layout with page contents
  // save to html
  const template = templateConfig.page.template || 'default';
  const templateFileName = `../templates/${template}.ejs`;

  (async () => {
    const output = await dejs.renderFile( templateFileName, Object.assign({}, templateConfig, {
          body: pageContent,
          filename: templateFileName
        }))
    const completePage = await Deno.open(`${buildPath}/${path.parse(filePath).name}.html`, {create: true, write: true});
    await Deno.copy(output, completePage)
  })();

}