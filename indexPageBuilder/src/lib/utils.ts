import fs from 'fs';
import { marked } from 'marked';
import path from 'path';

export const isDir = (filepath:string)=>{
  const stats = fs.statSync(filepath);
  return stats.isDirectory();
}
export const isHiddenFileOrDir = (filename:string)=>{
  return filename.charAt(0) === '.'
}
export const isFileEmpty = (filePath:string)=>{
  const stats = fs.statSync(filePath);
  return stats.size === 0;
}
export const checkIfDirExists = (filePath:string)=>{
  return fs.existsSync(filePath)
}
export const createDirIfNotExists = (dirpath:string)=>{
  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath);
  } 
}

export const checkIfFileExists = (filepath:string)=>{
  try {
    fs.accessSync(filepath);
    return true;
  } catch (err) {
    return false;
  }
}

export const createFileIfNotExists = (filepath:string)=>{
  if(!checkIfFileExists(filepath)){
    fs.writeFile(filepath,"",(err)=>{
      if(err) throw err;
    })
  }
}

export const mdToHtml = (markdownfilepath:string)=>{
  const mainfile = fs.readFileSync(markdownfilepath)
  return marked.parse(mainfile.toString())
}