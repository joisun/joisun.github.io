import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function msToTime(duration: number): string {
  const milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const hoursStr = (hours < 10) ? "0" + hours : hours;
  const minutesStr = (minutes < 10) ? "0" + minutes : minutes;
  const secondsStr = (seconds < 10) ? "0" + seconds : seconds;

  return hoursStr + ":" + minutesStr + ":" + secondsStr ;
}

export type GenerateGMParams = {
  bitrate: string,
  compression: number,
  fps: number,
  loop: number,
  pix_fmt?: string,
  select: number,
  width: number,
  filetype: string,
  input?: string,
  output?: string
}

export const generateFFmpegCommand = function (params: GenerateGMParams) {
  // 设置默认值
  const defaults = {
    bitrate: "800k",
    compression: 23,  // 使用更常见的 CRF 值范围
    fps: 30,
    loop: 0,
    pix_fmt: "yuv420p",  // 更常用的像素格式
    select: 1,
    width: 480,
    input: "input.mp4",
    output: "output",
    filetype: 'mp4'
  };

  // 合并默认值和用户提供的参数
  const options = { ...defaults, ...params };

  // 构建命令数组
  const commandParts = [
    "ffmpeg",
    `-i "${options.input}"`,
    `-b:v ${options.bitrate}`,
    `-crf ${options.compression}`,
    `-r ${options.fps}`,
    options.loop !== 0 ? `-loop ${options.loop}` : '',
    `-vf "select='not(mod(n,${options.select}))',scale=${options.width}:-1"`,
    `-pix_fmt ${options.pix_fmt}`,
    `"${options.output}.${options.filetype}"`
  ];



  // 过滤掉空字符串，并用空格连接所有部分
  return commandParts.filter(part => part !== '').join(' ');
}