import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import generateHtml from './lib/generateHtml.ts';
import getBody from './lib/getBody.ts';
import getTemplates from './lib/getTemplates.ts';
import { createDirIfNotExists, createFileIfNotExists, mdToHtml } from './lib/utils.ts';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const  { Title, About, Footer } = getTemplates()

function appendToMain(content:Buffer){
  const output = checkOutputDir()
  fs.appendFileSync(path.join(output,"Main.md"),content + '\n')
}


function checkOutputDir(){
  // 检查并创建 /templates/output 是否存在
  const output = path.join(__dirname,"./templates/output")
  createDirIfNotExists(output)
  return output;
}
function clearMainContent(){
  const output = checkOutputDir()
  fs.writeFile(path.join(output,"Main.md"),"",(err)=>{
    if(err) throw err;
  })
}



function generateMainFile(){
  console.log("1.初始化 output/Main.md ")
  clearMainContent()
  
  console.log("2.合并 Title ")
  appendToMain(Title);

  console.log("3.合并 About ")
  appendToMain(About);

  console.log("4.生成 Body 内容 ")
  const bodyContent = getBody()
  bodyContent.forEach(({category,mdlinks})=>{
    appendToMain(category);
    mdlinks.forEach(mdlink=>{
      appendToMain(mdlink);
    })
  })

  console.log("5.合并 Footer ")
  appendToMain(Footer);
  return path.join(__dirname,"./templates/output/Main.md")
}

function writeHTML(content:string){
  const dist = path.join(__dirname,"../dist")
  createDirIfNotExists(dist)
  const html = path.join(dist,"index.html")
  createFileIfNotExists(html)

  console.log("6.开始基于 base/index.html 模板生成 html 文件")
  const htmlBasedOnTemp = generateHtml(content)
  
  try{
    fs.writeFileSync(html, htmlBasedOnTemp,{encoding:'utf-8'})
  }catch(err){
    throw err
  }
  console.log("7.html 文件已经生成完毕")

}

const main = generateMainFile()
const htmlStr = mdToHtml(main)
writeHTML(htmlStr);

// 将dist目录文件复制到根目录
console.log("8.将dist目录文件复制到根目录")
const distPath = path.join(__dirname,"../dist")
const files = fs.readdirSync(distPath)
const rootPath = path.join(__dirname,"../../")
files.forEach(file =>{
  fs.copyFileSync(path.join(distPath,file),path.join(rootPath,file))
})
console.log("9.finish !!!")
