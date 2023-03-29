import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const demosDir = path.join(__dirname, '../../../demos')

function isDir(filename:string){
  const stats = fs.statSync(path.join(demosDir,filename));
  return stats.isDirectory();
}
function ifExistIndexMd(filename:string){
  try {
    fs.accessSync(path.join(demosDir,filename,"index.md"));
    return true;
  } catch (err) {
    return false;
  }
}
function getTitles(filelist:string[] | Buffer[]){
  filelist.forEach(filename=>{
    let _isDir = isDir(filename)
    if(_isDir && ifExistIndexMd(filename)){
      // is directory
      console.log("exist:"+ filename)
      

    }
    
  })
}

export default function(){
  console.log( demosDir)
  fs.readdir(demosDir,{},(err,files)=>{
    getTitles(files)
    
  })
}