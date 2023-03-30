import * as dotenv from 'dotenv';
// generate Html Based On Html Template
import fs from 'fs';
import { JSDOM } from 'jsdom';
import path from 'path';
import { fileURLToPath } from 'url';

import collectLinkStyle from './collectLinkStyle.ts';
import { checkIfDirExists, checkIfFileExists } from './utils.ts';

dotenv.config();
const __sitetitle = process.env.SITE_TITLE
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);


export default function(insertHtmlStr:string){
  const basePath = path.join(__dirname, '../base')
  const baseHtml = path.join(basePath,"index.html")
  if(!checkIfDirExists(basePath) || !checkIfFileExists(baseHtml)){
    throw new Error("src/public 目录为空或其中缺失index.html文件, 这是生成html页面的base目录")
  }

  let baseHtmlTemplate = null
  try{
    baseHtmlTemplate = fs.readFileSync(baseHtml)
  }catch(err){
    throw err
  }

  const baseHtmlDom = new JSDOM(baseHtmlTemplate)
  const doc = baseHtmlDom.window.document;

  
  const styles = collectLinkStyle();
  styles.forEach(style=>{
    const link = doc.createElement('link');
    link.href = style
    link.rel = "stylesheet"
    console.log(" - 6.1写入样式引用link")
    // 插入样式
    doc.head.appendChild(link);
  })

  // 插入title
  console.log(" - 6.2写入title 字段")

  doc.title = __sitetitle
  // 插入body内容
  console.log(" - 6.3插入 body 内容")
  // 给body 设置一个 #root
  doc.body.setAttribute('id',"root")
  doc.body.innerHTML = insertHtmlStr
  let s = baseHtmlDom.serialize()


  // 收集 base/xxx 到 dist/

  console.log(" - 6.4收集 index 依赖 到 dist 目录")
  const base = path.join(__dirname,"../base")
  const files = fs.readdirSync(base);
  const dist = path.join(__dirname,"../../dist")
  files.forEach(file=>{
    if(!file.includes('index.html')){
      fs.copyFileSync(path.join(base,file),path.join(dist,file))
    }
  })
  return s
}

