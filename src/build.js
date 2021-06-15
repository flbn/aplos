import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import marked from "marked";
import mkdirp from "mkdirp";
import path from "path";

const readFile = (filename) => {
  const rawFile = fs.readFileSync(filename, "utf8");
  const parsed = matter(rawFile);
  const html = marked(parsed.content);

  return { ...parsed, html };
}

const templatize = (template, { date, title, content }) =>
  template
	.replace(/<!-- PUBLISH_DATE -->/g, ( date != undefined ? date : "" ))
    .replace(/<!-- TITLE -->/g, title)
    .replace(/<!-- CONTENT -->/g, content);

const saveStylesheet = (newFilename, oldFilename) => {
  let dir = path.basename(path.dirname(newFilename));
  if (dir == "styles") {
      const contents = fs.readFileSync(oldFilename, "utf8");
	    fs.writeFileSync(newFilename, contents);
	} else {
      dir = dir + '/styles/'
      mkdirp.sync(dir);
  }
}

const saveAsset = (newFilename, oldFilename) => {
  let dir = path.basename(path.dirname(newFilename));
  if (dir == "assets") {
    fs.readFile(oldFilename, function (err, data) {
      if (err) throw err;
      fs.writeFile(newFilename, data, function (err) {
          if (err) throw err;
      });
  });
	} else {
      dir = dir + '/assets/'
      mkdirp.sync(dir);
  }
}

const saveFile = (filename, contents) => {
  const dir = path.dirname(filename);
  mkdirp.sync(dir);
  fs.writeFileSync(filename, contents);
}

const getOutputStylesheet = (stylesheet, outPath) => {
  const basename = path.basename(stylesheet);
  const dir = path.basename(path.dirname(stylesheet));
  if (dir == "styles") { 
	  return path.join(outPath, "styles" , basename);
	} else {
	  return path.join(outPath, basename);
	}
}

const getOutputAsset = (asset, outPath) => {
  const basename = path.basename(asset);
  const dir = path.basename(path.dirname(asset));
  if (dir == "assets") { 
	  return path.join(outPath, "assets" , basename);
	} else {
	  return path.join(outPath, basename);
	}
}

const getOutputFilename = (filename, outPath) => {
  const basename = path.basename(filename);
  const dir = path.basename(path.dirname(filename));
  const newfilename = basename.substring(0, basename.length - 3) + ".html";

  if (dir != "pages") { 
	  return path.join(outPath, dir, newfilename);
  } else {
	  return path.join(outPath, newfilename);
	}
}

const processSheet = (stylesheet, outPath) => {
  const outfilename = getOutputStylesheet(stylesheet, outPath);
  saveStylesheet(outfilename, stylesheet);
}

const processAsset = (asset, outPath) => {
  const outfilename = getOutputAsset(asset, outPath);
  saveAsset(outfilename, asset);
}

const processFile = (filename, outPath) => {
  const file = readFile(filename);
  const outfilename = getOutputFilename(filename, outPath);
  const template = fs.readFileSync(path.join("src/templates", `${file.data.template}.html`), "utf8");

  const templatized = templatize(template, {
	  date: file.data.date,
	  title: file.data.title,
	  content: file.html,
	});

  console.log(`building the ${file.data.title} page...`);
  saveFile(outfilename, templatized);
  console.log(`built the ${file.data.title} page!\n`);
}

const main = () => {
  const srcPath = path.resolve("src");
  const outPath = path.resolve("build");
  const filenames = glob.sync(srcPath + "/pages/**/*.md");
  const stylesheets = glob.sync(srcPath + "/styles/**");
  const assets = glob.sync(srcPath + "/assets/**")

  stylesheets.forEach((stylesheet) => {
	  processSheet(stylesheet, outPath);
  });

  assets.forEach((asset) => {
	  processAsset(asset, outPath);
  });

  filenames.forEach((filename) => {
	  processFile(filename, outPath);
  });
}

main();