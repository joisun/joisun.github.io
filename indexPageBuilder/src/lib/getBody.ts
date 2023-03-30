import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { isDir, isFileEmpty, isHiddenFileOrDir } from './utils.ts';

dotenv.config();
const __basicurl = process.env.GITHUB_URL
const __entrydir= process.env.ENTRY_DIR
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const demosDir = path.join(__dirname, `../../../${__entrydir}`)


function ifExistIndexMd(subpath:string){
  try {
    fs.accessSync(path.join(demosDir,subpath,"index.md"));
    return true;
  } catch (err) {
    return false;
  }
}
function generateMdLink(category:string,filename:string){
  const subpath = path.join(category,filename)
  const ifHasIndexMdInDemo = ifExistIndexMd(subpath)
  let title:string|Buffer = `${__entrydir}/${subpath}/index.md 文件缺失,其内容应该是demo项目的名称,内容格式为纯文本`
  if(ifHasIndexMdInDemo){
    title = fs.readFileSync(path.join(demosDir,category,filename,"index.md"))
  }
  const link = `- [${title}](${__basicurl}/${__entrydir}/${category}/${filename}/dist)`
  return link;
}
function getDemos(category:string){
  const files = fs.readdirSync(path.join(demosDir,category))
  let mdLinks = []
  files.forEach(demofilename=>{
    if(isDir(path.join(demosDir,category,demofilename))){
      // demos/xxx 是目录
      mdLinks.push(generateMdLink(category,demofilename))
    }
  })
  return mdLinks
}


function getBodyContent(filelist:string[] | Buffer[]){
  const bodyContent = [];
  filelist.forEach(filename=>{
    let _isDir = isDir(path.join(demosDir,filename))
    // demos/xxxx/index.md  必须存在
    if(_isDir &&  !isHiddenFileOrDir(filename)  && !ifExistIndexMd(filename)){
      // is Dir but has no demos/xxxx/index.md file
      throw Error(path.join(__basicurl,__entrydir,filename) + " 目录下不存在index.md 文件,该文件是必须的,它将用于生成 分类 字段,其内容应当是一个md文本标题")
    }
    if(_isDir &&  !isHiddenFileOrDir(filename) && ifExistIndexMd(filename)){
      // is directory
      // get the category name
      const filePath = path.join(demosDir,filename,"index.md")
      if(isFileEmpty(filePath)){
        throw Error(path.join(__basicurl,__entrydir,filename) + " 目录下 index.md 文件内容不可为空,它将用于生成 分类 字段,其内容应当是一个md文本标题")
      }
      const category = fs.readFileSync(filePath)

      const mdlinks = getDemos(filename)
      bodyContent.push({
        category,mdlinks
      })
    }
    
  })
  return bodyContent
}

export default function() {
  try{
    const files = fs.readdirSync(demosDir)
    return getBodyContent(files)
  }catch(err){
    throw err
  }
}