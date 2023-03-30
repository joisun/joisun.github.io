// collect theme/stylefilename.css to dist/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { createDirIfNotExists } from './utils.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

/**
 * 收集index.html 外链样式资源
 */
export default function(){
//  收集样式
const stylePath = path.join(__dirname,"../theme");
const files = fs.readdirSync(stylePath);
const distPath = path.join(__dirname,"../../dist")
createDirIfNotExists(distPath)
files.forEach(file=>{
  fs.copyFileSync(path.join(stylePath,file),path.join(distPath,file))
})
return files
}

