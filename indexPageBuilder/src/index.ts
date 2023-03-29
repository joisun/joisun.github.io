import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import getBody from './lib/getBody.js';
import getTemplates from './lib/getTemplates.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const  { Title,About,Footer} = getTemplates()
function appendToMain(content:Buffer){
  fs.appendFileSync(path.join(__dirname,"./templates/Main.md"),content + '\n')
}
function clearMainContent(){
  fs.writeFile(path.join(__dirname,"./templates/Main.md"),"",(err)=>{
    if(err) throw err;
    "文件内容已经清除"
  })
}
const bodyContent = getBody()



clearMainContent()
appendToMain(Title);
appendToMain(About);

bodyContent.forEach(({category,mdlinks})=>{
  appendToMain(category);
  mdlinks.forEach(mdlink=>{
    appendToMain(mdlink);
  })
})

appendToMain(Footer);