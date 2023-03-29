import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 执行 ts-node --esm getTitle.ts 以查看打印结果;//https://stackoverflow.com/questions/62096269/cant-run-my-node-js-typescript-project-typeerror-err-unknown-file-extension
// console.log('[_filename]: ', _filename)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
export default ()=>{
  const Title = fs.readFileSync(path.join(__dirname,"../templates/Title.md"))
  const About = fs.readFileSync(path.join(__dirname,"../templates/About.md"))
  const Footer = fs.readFileSync(path.join(__dirname,"../templates/Footer.md"))
  return {Title,About,Footer}
}